import {makeObservable, observable, action} from "mobx";
import io from "socket.io-client";
import common from "../../config/common";

class GameStore {

  _tid = null;
  _stage = 'connection';
  _players = [];
  _currentTurn = 0;

  constructor (store) {
    makeObservable(this, {
      _tid: observable,
      _stage: observable,
      _players: observable,
      _currentTurn: observable,

      setTID: action,
      setStage: action,
      setPlayers: action
    });

    this._store = store;
    this._socket = null;

    this._connect();
    this._sockets();
  }

  _connect(){
    this._socket = io(process.env.REACT_APP_SOCKET_SERVER);
  }

  // get game(){
  //   return this.game;
  // }

  get tid(){
    return this._tid;
  }

  get stage(){
    return this._stage;
  }

  get players(){
    return this._players;
  }

  player(index){
    return this._players[index];
  }

  get currentTurn(){
    return this._currentTurn;
  }

  setTID(tid){
    this._tid = tid;
  }

  setStage(stage) {
    this._stage = stage;
  }

  setPlayers(players) {
    this._players = players;
  }


  _sockets(){
    const
      store = this._store,
      socket = this._socket;

    socket.on('request-info', () => {
      socket.emit('user-info', store.user.data);
    });

    socket.on('connect-success', () => {
      if(this.stage !== 'lobby'){
        socket.emit('in-lobby');
        this.setStage('lobby');
      }
    });

    socket.on('put-table', (response) => {
      if(response.uid !== store.user.data.id) return;
      if(this.stage === 'table') return;

      this.setTID(response.tid);
      this.setStage('table');

      socket.emit('in-table', this.tid);
    });

    socket.on('update-players', (response) => {
      const tid = response.tid;
      const players = response.players;

      if(tid === this.tid) {
        players.forEach(player => {
          if(common.randomNumber(0, 1)) player.kissed.push(true);
          if(player.id === store.user.data.id) {
            player.itsMe = true;
          }
        });

        this.setPlayers(players);
      }
    });

    socket.on('current-stage', (stage) => {
      this.setStage(stage.current);
    });

    socket.on('console', (res) => console.log(res));
  }
}

export default GameStore