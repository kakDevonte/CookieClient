import { action, makeObservable, observable } from "mobx";
import { store } from "core-js/internals/reflect-metadata";

class AppStore {
  _version = 1;
  _stage = "connection";
  _size = null;
  _keepConnect = false;
  _backLayer = "";
  _errors = [];
  _search = "";

  constructor(store) {
    this._calculateSizes(store.os);

    makeObservable(this, {
      _version: observable,
      _stage: observable,
      _backLayer: observable,
      _search: observable,
      _errors: observable,

      setStage: action,
      setVersion: action,
      setBackLayer: action,
      setSearch: action,
    });
    this._store = store;
  }

  get version() {
    return this._version;
  }
  get stage() {
    return this._stage;
  }
  get errors() {
    return this._errors;
  }
  get size() {
    return this._size;
  }
  get backLayer() {
    return this._backLayer;
  }
  get search() {
    return this._search;
  }

  setSearch(search) {
    this._search = search;
  }
  setVersion(version) {
    this._version = version;
  }
  setSize(size) {
    this._size = size;
  }
  setBackLayer(state) {
    this._backLayer = state;
  }
  setStage(stage, errors) {
    if (errors) this._errors = errors;
    this._stage = stage;
  }

  _calculateSizes(os) {
    let body, width, height, maxHeight, talkHeight, margin;

    if (document) {
      body = document.querySelector("body");

      if (body) {
        body = body.getBoundingClientRect();
        margin = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--sat"),
          10
        );

        maxHeight = window.innerHeight;
        if (os === "iOS" || os === "Android") {
          maxHeight = maxHeight - margin;
        }

        width = maxHeight * 0.616;
        // width = body.width >= width ?  width : body.width;
        width = window.innerWidth >= width ? width : window.innerWidth;
        height = window.innerWidth * 1.1947;
        talkHeight = parseInt((width - 26) / 6.232 - 16, 10);

        this.setSize({
          game: {
            width: width,
            height: maxHeight,
            marginTop: margin,
          },
          // table: {
          //   width: width,
          //   height: height >= maxHeight * 0.72 ? maxHeight * 0.72 : height,
          // },
          // utilities: {
          //   width: width,
          //   height:
          //     height >= maxHeight * 0.72
          //       ? maxHeight * 0.28 - 15
          //       : maxHeight - height - 15,
          // },
          gift: {
            height: parseInt(((width - 26) / 5) * 1.432, 10),
          },
          talk: {
            height: talkHeight > 40 ? 40 : talkHeight,
          },
          giftConfirm: {
            height: parseInt(width * 0.765, 10),
          },
          ratingListItem: {
            height: parseInt(
              os === "desktop_web" ? width * 0.076 : width * 0.118,
              10
            ),
          },
        });
      }
    }
  }

  get keepConnect() {
    return this._keepConnect;
  }

  /**
   * Метод для ужержания соединения с сокетами и продолжения игры
   * @param {boolean} keep - удерживать или рвать
   */
  keep(keep) {
    this._keepConnect = keep;
  }

  closeApp() {
    console.log(this.stage);
    if (this.stage === "error") return;

    this.setStage("connection");

    this._store.history.replace({
      pathname: "/connection",
      state: { background: store.location },
    });

    this._store.socket.emit("close-roulette");
  }

  /**
   * Переносит игрока к проверки возраста
   */
  stageAdult() {
    if (this.stage === "adult") return;

    this._store.history.replace({
      pathname: "/adult",
      state: { background: store.location },
    });

    this.setStage("adult");
    this._store.chat.setMode("local");
    this._store.inventory.setMode("local");
    //this._store.socket.emit('in-tutorial');
  }

  /**
   * Переносит игрока к проверки возраста
   */
  stageDelete() {
    if (this.stage === "delete") return;

    this._store.history.replace({
      pathname: "/delete",
      state: { background: store.location },
    });

    this.setStage("delete");
    this._store.chat.setMode("local");
    this._store.inventory.setMode("local");
    //this._store.socket.emit('in-tutorial');
  }

  /**
   * Переносит игрока к туториалу
   */
  stageTutorial() {
    if (this.stage === "tutorial") return;

    this._store.history.replace({
      pathname: "/tutorial",
      state: { background: store.location },
    });

    this.setStage("tutorial");
    this._store.chat.setMode("local");
    this._store.inventory.setMode("local");
    this._store.socket.emit("in-tutorial");
  }

  /**
   * Переносит игрока в лобби
   * @param {=string} tid - предыдущий стол
   */
  stageLobby(tid) {
    if (this.stage === "lobby") return;

    //this._store.history.replace('/game');
    this._store.chat.setMode("global");
    this._store.inventory.setMode("global");
    this._store.game.clearGameState();
    this.setStage("lobby");
    this._store.history.replace({
      pathname: "/lobby",
      state: { background: store.location },
    });
    this._store.socket.emit("in-lobby", { tid, uid: this._store.user.id }); //this._store.user.id
  }

  /**
   * Переносит игрока на игровой стол
   * @param {string} tid - текущий стол
   */
  stageTable(tid) {
    if (this.stage === "table") return;

    this._store.history.replace({
      pathname: "/game",
      state: { background: store.location },
    });
    this.setStage("table");
    this._store.socket.emit("in-table", { tid, uid: this._store.user.id });
  }

  stageError(errors) {
    if (this.stage === "error") return;

    console.log(errors);
    this.setStage("error", errors);

    this._store.history.replace({
      pathname: "/error",
      state: { background: store.location },
    });
  }

  openBackLayer() {
    if (this._backLayer === "") this.setBackLayer(" opened");
  }

  closeBackLayer() {
    if (this._backLayer === " opened") this.setBackLayer("");
  }
}

export default AppStore;
