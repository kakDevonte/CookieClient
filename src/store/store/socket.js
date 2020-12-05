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

    socket.on('personal-data', (data) => {
      this._store.user.updatePersonalInfo(data);

      console.log('socket (personal-data)', data);
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

      console.log("socket (update-players)");
    });

    //////////////////////////////////////////////////////////////

    socket.on('current-stage', (stage) => {
      store.app.setStage(stage.current);

      console.log('socket (current-stage)', stage);
    });

    //////////////////////////////////////////////////////////////

    socket.on('game-data', (data) => {
      store.game.updateGameData(data);

      console.log('socket (game-data)', data);
      //console.log('socket (game-data)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('allow-start-rotate', () => {
      store.game.enableRotateClickHandler();

      console.log('socket (allow-start-rotate)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('start-rotate', (seat) => {
      store.game.rotateSelector(seat);

      console.log('socket (start-rotate)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('kiss-request', () => {
      store.game.kissRequest();

      console.log('socket (kiss-request)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('received-kiss', (response) => {
      store.game.updateKiss(response.active, response.kiss);

      console.log('socket (received-kiss)', response);
    });

    //////////////////////////////////////////////////////////////

    socket.on('round-result', (result) => {
      store.game.doShowRoundResult(result);

      console.log('socket (round-result)', result);
    });

    //////////////////////////////////////////////////////////////

    socket.on('update-kiss-data', (result) => {
      store.game.updateKissData(result);

      console.log('socket (round-result)', result);
    });

    //////////////////////////////////////////////////////////////

    socket.on('chat-message', (result) => {
      this._store.chat.updateMessages(result);

      console.log('socket (chat-message)', result);
    });

    //////////////////////////////////////////////////////////////
  }
}

export default SocketStore;