import {makeObservable, observable, action} from "mobx";
import io from "socket.io-client";

class SocketStore {
  constructor (store) {
    this._socket = null;
    this._store = store;

    makeObservable(this, {
      _socket: observable,

      connect: action,
    });
  }

  connect(){
    if(!this.serverFail) return;

    const options = {
      reconnectionDelay: 1000,
      reconnectionAttempts: 4,
    };

    this._socket = process.env.NODE_ENV === 'production' ?
      io(process.env.REACT_APP_SOCKET_SERVER, options) :
      io(process.env.REACT_APP_SOCKET_SERVER_DEV, options);

    this._sockets();
  }

  get serverFail() {
    if(this._socket) return !this._socket.connected;
    return true;
  };

  emit(event, data) {
    return this._socket.emit(event, data);
  }

  _serverDown(type){
    //console.log(type);

    setTimeout(() => {
      if(this.serverFail) {
        this._store.app.setStage('connection');
      }
    }, 2500);
  }

  _sockets() {
    const
      store = this._store,
      socket = this._socket;

    //////////////////////////////////////////////////////////////

    socket.on( 'connect_error', () => {
      this._serverDown('connect');
    });

    socket.on( 'disconnect', () => {
      this._serverDown('game');
    });

    //////////////////////////////////////////////////////////////

    socket.on('request-info', () => {
      store.user.emitUserInfo(socket);

      //console.log('socket (request-info)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('error-occurred', (errors) => {
      store.app.stageError(errors);

      // console.log('socket (error-occurred)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('connect-success', (enters) => {
      if(enters && enters !== 0) {
        store.app.stageLobby();
      } else {
        store.app.stageTutorial();
      }
      // console.log('socket (connect-success)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('personal-data', (data) => {
      this._store.user.updatePersonalInfo(data);

      // console.log('socket (personal-data)', data);
    });

    //////////////////////////////////////////////////////////////

    socket.on('put-table', (response) => {
      if(response.uid !== store.user.data.id) return;

      store.table.setId(response.tid);
      store.app.stageTable(response.tid);

      // console.log('socket (put-table)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('update-players', (response) => {
      store.table.update(response.tid, response.groups, response.players);

      // console.log("socket (update-players)");
    });

    //////////////////////////////////////////////////////////////

    socket.on('current-stage', (stage) => {
      store.app.setStage(stage.current);

      // console.log('socket (current-stage)', stage);
    });

    //////////////////////////////////////////////////////////////

    socket.on('game-data', (data) => {
      store.game.updateGameData(data);

      // console.log('socket (game-data)', data);
      //console.log('socket (game-data)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('allow-start-rotate', () => {
      store.game.enableRotateClickHandler();

      // console.log('socket (allow-start-rotate)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('start-rotate', (seat) => {
      store.game.rotateSelector(seat);

      // console.log('socket (start-rotate)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('kiss-request', () => {
      store.game.kissRequest();

      // console.log('socket (kiss-request)');
    });

    //////////////////////////////////////////////////////////////

    socket.on('received-kiss', (response) => {
      store.game.updateKiss(response.active, response.kiss);

      // console.log('socket (received-kiss)', response);
    });

    //////////////////////////////////////////////////////////////

    socket.on('round-result', (result) => {
      store.game.doShowRoundResult(result);

      // console.log('socket (round-result)', result);
    });

    //////////////////////////////////////////////////////////////

    socket.on('update-kiss-data', (result) => {
      store.game.updateKissData(result);

      // console.log('socket (round-result)', result);
    });

    //////////////////////////////////////////////////////////////

    socket.on('chat-message', (result) => {
      this._store.chat.updateMessages(result);

      // console.log('socket (chat-message)', result);
    });

    //////////////////////////////////////////////////////////////

    socket.on('gifts-data', (response) => {
      this._store.inventory.receiveGiftsData(response);

      // console.log('socket (gifts-data)', response);
    });

    //////////////////////////////////////////////////////////////

    socket.on('receive-gift', (response) => {
      this._store.game.receiveGift(response);

      // console.log('socket (receive-gift)', response);
    });

    //////////////////////////////////////////////////////////////
  }
}

export default SocketStore;