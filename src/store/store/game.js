import {makeObservable, observable, action} from "mobx";
import io from "socket.io-client";
import common from "../../config/common";
import Collection from "../../helpers/Collection";

class GameStore {

  _tid = null;
  _stage = 'connection';
  _players = new Map();
  _currentTurn = null;
  _groups = {
    male: 0,
    female: 0
  };

  constructor (store) {
    this.getPlayer = this.getPlayer.bind(this);
    this._players.set('getPlayer', this.getPlayer);

    makeObservable(this, {
      _tid: observable,
      _stage: observable,
      _players: observable,
      _currentTurn: observable,

      setTID: action,
      setStage: action,
      setPlayer: action,
      updatePlayers: action,
      setCurrentTurn: action
    });

    this._store = store;
    this._socket = null;

    this._connect();
    this._sockets();
  }

  _connect() {
    this._socket = io(process.env.REACT_APP_SOCKET_SERVER);
  }

  get tid() {
    return this._tid;
  }

  get stage() {
    return this._stage;
  }

  get players() {
    return this._players;
  }

  getPlayer(index) {
    return this._players.get(index);
  }

  get currentTurn() {
    return this._currentTurn;
  }

  setTID(tid) {
    this._tid = tid;
  }

  setStage(stage) {
    this._stage = stage;
  }

  setPlayer(index, object) {
    this._players.set(index, object);
  }

  setCurrentTurn(index){
    this._currentTurn = index;
  }

  _sockets() {
    const
      store = this._store,
      socket = this._socket;

    socket.on('request-info', () => {
      socket.emit('user-info', store.user.data);
      console.log('request-info');
    });

    socket.on('connect-success', () => {
      if(this.stage !== 'lobby'){
        socket.emit('in-lobby');
        this.setStage('lobby');
        console.log('connect-success');
      }
    });

    socket.on('put-table', (response) => {
      if(response.uid !== store.user.data.id) return;
      if(this.stage === 'table') return;

      this.setTID(response.tid);
      this.setStage('table');

      console.log('put-table');
      socket.emit('in-table', this.tid);
    });

    socket.on('update-players', (response) => {
      this._groups = response.groups;
      this.updatePlayers(response.tid, response.players);
      this._startGame(response.current);

      console.log("update-players", response.current);
    });

    socket.on('current-stage', (stage) => {
      console.log('current-stage', stage);
      this.setStage(stage.current);
    });

    socket.on('kiss-question', ({uid, seat}) => {
      console.log(this.getPlayer(seat).name);
    });

    socket.on('console', (res) => console.log(res));
  }

  _startGame(current) {
    if(current === null) return;
    if(this.currentTurn === current) return;

    const player = Collection.takeOne(this._players, current + 1);

    if(player === null) return;
    if(player.id !== this._store.user.data.id) return;
    if(this._isPlayersReady()) return;

    this.setCurrentTurn(current);

    setTimeout(() => {
      this._rotateRoulette();
    }, 1000);
  }

  _rotateRoulette(){
    const data = {
      tid: this.tid,
      uid: this._store.user.data.id
    };

    console.log("Rotate roulette!");

    this._socket.emit('rotate-roulette', data);
  }

  _isPlayersReady(){
    return (this._groups.male < 2 && this._groups.female < 2);
  }


  updatePlayers(tid, players){
    if(tid === this.tid) {
      players.forEach((player, index) => {
        let update;
        const current = this.getPlayer(index);

        if(player){
          if(player.id === this._store.user.data.id) {
            player.itsMe = true;
          }

          if(!current) {
            update = true;
          }

          if(current && current.id !== player.id) {
            update = true;
          }
        } else {
          if(current) update = true;
        }

        if(update) this._players.set(index, player);
      });
    }
  }
}

export default GameStore