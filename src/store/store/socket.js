import {makeObservable, observable} from "mobx";
import io from "socket.io-client";
import Collection from "../../helpers/Collection";

class SocketStore {
  constructor (store) {
    this._socket = io(process.env.REACT_APP_SOCKET_SERVER);
    this._store = store;

    makeObservable(this, {
      _socket: observable
    });

    this._sockets();
  }

  emit(event, data) {
    return this._socket.emit(event, data);
  }

  _sockets() {
    const
      store = this._store,
      socket = this._socket;

    //////////////////////////////////////////////////////////////

    socket.on('request-info', () => {
      store.user.emitUserInfo(socket);

      console.log('socket (request-info)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('connect-success', () => {
      store.app.stageLobby();

      console.log('socket (connect-success)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('put-table', (response) => {
      if(response.uid !== store.user.data.id) return;

      store.table.setId(response.tid);
      store.app.stageTable(response.tid);

      console.log('socket (put-table)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('update-players', (response) => {

      store.table.update(response.tid, response.groups, response.players);
      store.game.calculateTurnRemain();

      //this._startGame(response.current);

      console.log("socket (update-players)", response.current);
    });

    //////////////////////////////////////////////////////////////

    socket.on('current-player', (uid) => {
      store.game.updateActivePlayer(uid);

      console.log('socket (current-player)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('current-stage', (stage) => {
      store.app.stage = stage.current;

      console.log('socket (current-stage)', stage);
    });

    //////////////////////////////////////////////////////////////

    socket.on('game-data', (data) => {
      store.game.updateGameData(data);

      console.log('socket (game-data)', data);
      //console.log('socket (game-data)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('round-start', () => {
      store.game.rotateSelector();

      console.log('socket (round-start)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('kiss-request', () => {

      store.game.kissRequest();

      console.log('socket (kiss-question)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('result-kiss', (response) => {

      store.game.updateKiss(response.active, response.kiss);

      //this.updateDecisionResult('target', kiss);

      console.log('socket (opponent-kiss-result)', response);
    });

    //////////////////////////////////////////////////////////////

    socket.on('round-result', (result) => {
      store.game.doShowRoundResult(result);

      console.log('socket (round-result)', result);
    });

    //////////////////////////////////////////////////////////////
  }
}

export default SocketStore;