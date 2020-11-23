import {makeObservable, observable} from "mobx";
import io from "socket.io-client";
import common from "../../config/common";

class GameStore {

  tid = null;
  stage = 'connection';
  players = [];
  currentTurn = 0;

  constructor (store) {
    makeObservable(this, {
      tid: observable,
      stage: observable,
      players: observable,
      currentTurn: observable
    });

    this.store = store;
    this.socket = null;

    this.sockets();
  }

  sockets(){
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER);

    const
      store = this.store,
      socket = this.socket;

    socket.on('request-info', () => {
      socket.emit('user-info', store.user.data);
    });

    socket.on('connect-success', () => {
      if(this.stage !== 'lobby'){
        socket.emit('in-lobby');
        this.stage = 'lobby';
      }
    });

    socket.on('put-table', (response) => {
      if(response.uid !== store.user.data.id) return;
      if(this.stage === 'table') return;

      this.tid = response.tid;
      this.stage = 'table';

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

        this.players = players;
      }
    });

    socket.on('current-stage', (stage) => {
      this.stage = stage.current;
    });

    socket.on('console', (res) => console.log(res));
  }
}

export default GameStore