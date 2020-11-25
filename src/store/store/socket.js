import {makeObservable, observable} from "mobx";
import io from "socket.io-client";
import Collection from "../../helpers/Collection";

class SocketStore {
  constructor (store) {
    makeObservable(this, {

    });

    this._socket = io(process.env.REACT_APP_SOCKET_SERVER);
    this._store = store;

    this._sockets();
  }

  get emit(){ return this._socket.emit; }

  _sockets() {
    const
      store = this._store,
      socket = this._socket;

    socket.on('request-info', () => {
      store.user.emitUserInfo(socket);

      console.log('socket (request-info)');
    });

    socket.on('connect-success', () => {
      store.app.stageLobby();

      console.log('socket (connect-success)');
    });

    socket.on('put-table', (response) => {
      if(response.uid !== store.user.data.id) return;

      store.table.put(response.tid);
      store.app.stageTable(response.tid);

      console.log('socket (put-table)');
    });

    socket.on('update-players', (response) => {

      store.table.update(response.tid, response.groups, response.players);
      store.game.calculateTurnRemain();

      //this._startGame(response.current);

      console.log("socket (update-players)", response.current);
    });

    socket.on('current-player', (uid) => {
      store.game.updateCurrentPlayer(uid);

      console.log('socket (current-player)');
    });

    socket.on('current-stage', (stage) => {
      store.app.stage = stage.current;

      console.log('socket (current-stage)', stage);
    });

    socket.on('game-data', (data) => {
      console.log('socket (game-data)', data);
    });

    socket.on('kiss-question', ({uid, seat}) => {

      store.game.kissQuestion();

      console.log('socket (kiss-question)', this.getPlayer(seat).name);
    });

    socket.on('opponent-result-kiss', (kiss) => {
      this.updateDecisionResult('target', kiss);

      console.log('socket (opponent-kiss-result)', kiss);
    });
  }
}

export default SocketStore;