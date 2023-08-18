import { makeObservable, observable, action } from "mobx";
import io from "socket.io-client";
import bridge_moc from "@vkontakte/vk-bridge-mock";
import bridge_real from "@vkontakte/vk-bridge";
import { decryptData, encryptData } from "../../config/crypt";
import { crypt, decrypt, decryptFront } from "../../helpers/Common";

class SocketStore {
  constructor(store) {
    this._socket = null;
    this._store = store;

    makeObservable(this, {
      _socket: observable,

      connect: action,
    });
  }

  /**
   * Запаковыввает инфу о пользоватале для отправик на бек
   * @return {string}
   * @private
   */

  connect() {
    if (!this.serverFail) return;

    //const s = `vk_access_token_settings=&vk_app_id=51524168&vk_are_notifications_enabled=0&vk_is_app_user=0&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1678365644&vk_user_id=224001505&sign=9P3IBFwg4U1iWQEYcR2ZRYm6GgqAGmCRCZvGBRdy19Y`;
    //const s = "";
    const options = {
      reconnectionDelay: 1000,
      reconnectionAttempts: 4,
      query: {
        type: "bottle-game",
        params: crypt(
          `${this._store.user._params}|${this._store.user.id}`
          // process.env.NODE_ENV === "development"
          //   ? `${s}|${this._store.user.id}`
          //   : `${this._store.user._params}|${this._store.user.id}`
        ),
        //`vk_access_token_settings=&vk_app_id=51524168&vk_are_notifications_enabled=0&vk_is_app_user=0&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1678365644&vk_user_id=224001505&sign=9P3IBFwg4U1iWQEYcR2ZRYm6GgqAGmCRCZvGBRdy19Y`, //${window.location.search.slice(1)}
        // uid:
      },
    };

    this._socket =
      process.env.NODE_ENV === "production"
        ? io(process.env.REACT_APP_SOCKET_SERVER + "bottle/", options)
        : io(process.env.REACT_APP_SOCKET_SERVER_DEV + "bottle/", options);

    this._sockets();
  }

  get serverFail() {
    if (this._socket) return !this._socket.connected;
    return true;
  }

  emit(event, data) {
    if (typeof data === "object") {
      data.token = this._store.user.token;
    } else {
      data = {
        token: this._store.user.token,
        data: data,
      };
    }

    const str = JSON.stringify(data);
    // const bla = crypt(str);
    return this._socket.emit(event, crypt(str));
  }

  _serverDown(type) {
    // console.log(type);

    setTimeout(() => {
      if (this.serverFail) {
        // this._store.app.setStage("connection");
        this._store.app.closeApp();
      }
    }, 2500);
  }

  _sockets() {
    const store = this._store,
      socket = this._socket;

    //////////////////////////////////////////////////////////////

    socket.on("connect_error", () => {
      this._serverDown("connect");
    });

    socket.on("error", () => {
      this._serverDown("error");
    });

    socket.on("disconnect", () => {
      this._serverDown("game");
    });

    //////////////////////////////////////////////////////////////

    socket.on("request-info", (data) => {
      data = decrypt(data);

      if (data && data.token) {
        store.user.setToken(data.token);
        store.user.emitUserInfo(socket);
      } else {
        store.app.stageError(["Не получен токен"]);
      }

      //console.log('socket (request-info)');
    });

    //////////////////////////////////////////////////////////////

    socket.on("error-occurred", (errors) => {
      errors = decrypt(errors);

      store.app.stageError(errors);

      // console.log('socket (error-occurred)');
    });

    //////////////////////////////////////////////////////////////

    socket.on("connect-success", (data) => {
      data = decrypt(data);
      const { enters, adult, isDelete } = data;

      if (!adult || isDelete) {
        store.app.stageAdult();
      } else if (enters && enters > 0) {
        store.app.stageLobby();
      } else {
        store.app.stageTutorial();
      }
      //console.log('socket (connect-success)');
    });

    //////////////////////////////////////////////////////////////

    socket.on("personal-data", (data) => {
      data = decrypt(data);
      this._store.user.updatePersonalInfo(data);

      //console.log('socket (personal-data)', data);
    });

    // //////////////////////////////////////////////////////////////
    //
    socket.on("profile-data", (data) => {
      data = decrypt(data);
      this._store.profile.setData(data);
    });

    socket.on("set-delete", () => {
      store.app.stageDelete();
      store.user.setIsDelete(true);
      store.app.keep(false);
    });
    // //////////////////////////////////////////////////////////////
    //
    socket.on("add-cookie", (data) => {
      data = decrypt(data);
      console.log(data);
      this._store.amplitude.trackPayment(data?.count);
      this._store.user.toggleModal();
      this._store.user.addMoney(data.count);
      this._store.user.setCookieCount(data.count);
    });

    //console.log('socket (profile-data)', data);
    // this._store.user.updatePersonalInfo(data);

    //console.log("СЮДА");

    //////////////////////////////////////////////////////////////

    socket.on("put-table", (response) => {
      response = decrypt(response);
      if (response.uid !== store.user.data.id) return;

      store.table.setId(response.tid);
      store.app.stageTable(response.tid);

      // console.log('socket (put-table)');
    });

    //////////////////////////////////////////////////////////////

    socket.on("update-players", (response) => {
      response = decrypt(response);

      store.table.update(response.tid, response.groups, response.players);

      // console.log("socket (update-players)");
    });

    //////////////////////////////////////////////////////////////

    socket.on("adult-accepted", (response) => {
      store.app.stageTutorial();
      //store.app.stageLobby();
      // console.log("socket (update-players)");
    });

    //////////////////////////////////////////////////////////////

    socket.on("current-stage", (stage) => {
      stage = decrypt(stage);

      store.app.setStage(stage.current);

      // console.log('socket (current-stage)', stage);
    });

    //////////////////////////////////////////////////////////////

    socket.on("game-data", (data) => {
      data = decrypt(data);

      store.game.updateGameData(data);

      // console.log('socket (game-data)', data);
      //console.log('socket (game-data)');
    });

    //////////////////////////////////////////////////////////////

    socket.on("allow-start-rotate", () => {
      store.game.enableRotateClickHandler();

      // console.log('socket (allow-start-rotate)');
    });

    //////////////////////////////////////////////////////////////

    socket.on("start-rotate", (seat) => {
      seat = decrypt(seat);
      store.user.addRotate();
      store.game.rotateSelector(seat);

      // console.log('socket (start-rotate)');
    });

    //////////////////////////////////////////////////////////////

    socket.on("kiss-request", (round) => {
      round = decrypt(round);
      store.game.kissRequest(round);

      // console.log('socket (kiss-request)');
    });

    //////////////////////////////////////////////////////////////

    socket.on("received-kiss", (response) => {
      response = decrypt(response);

      store.game.updateKiss(response.active, response.kiss);

      // console.log('socket (received-kiss)', response);
    });

    //////////////////////////////////////////////////////////////

    socket.on("round-result", (result) => {
      result = decrypt(result);

      store.game.doShowRoundResult(result);

      // console.log('socket (round-result)', result);
    });

    //////////////////////////////////////////////////////////////

    socket.on("update-kiss-data", (result) => {
      result = decrypt(result);

      store.game.updateKissData(result);

      // console.log('socket (round-result)', result);
    });

    //////////////////////////////////////////////////////////////

    socket.on("chat-message", (result) => {
      result = decrypt(result);

      this._store.chat.updateMessages(result);

      // console.log('socket (chat-message)', result);
    });

    //////////////////////////////////////////////////////////////

    socket.on("gifts-data", (response) => {
      response = decrypt(response);

      this._store.inventory.receiveGiftsData(response);

      // console.log('socket (gifts-data)', response);
    });

    //////////////////////////////////////////////////////////////

    socket.on("receive-gift", (response) => {
      response = decrypt(response);

      this._store.game.receiveGift(response);

      // console.log('socket (receive-gift)', response);
    });

    //////////////////////////////////////////////////////////////

    socket.on("receive-rating-data", (response) => {
      // response = decrypt(response);

      this._store.rating.receiveData(response);

      // console.log('socket (receive-rating-data)', response);
    });

    //////////////////////////////////////////////////////////////
  }
}

export default SocketStore;
