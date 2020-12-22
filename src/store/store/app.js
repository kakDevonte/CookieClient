import {action, makeObservable, observable} from "mobx";

class AppStore {

  _version = 1;
  _stage = 'connection';
  _size = null;
  _keepConnect = false;

  constructor (store) {
    this._calculateSizes(store.os);

    makeObservable(this, {
      _version: observable,
      _stage: observable,

      setStage: action,
      setVersion: action,
    });
    this._store = store;
  }

  get version() { return this._version; }
  get stage() { return this._stage; }
  get size() { return this._size; }

  setVersion(version) { this._version = version; }
  setStage(stage) { this._stage = stage; }
  setSize(size) { this._size = size; }

  _calculateSizes(os) {
    let body, width, height, maxHeight;

    if(document) {
      body = document.querySelector('body');

      if(body) {
        body = body.getBoundingClientRect();

        maxHeight = body.height;
        if(os === 'iOS' || os === 'Android') {
          maxHeight = maxHeight - (maxHeight * 0.05);
        }

        width = maxHeight * 0.616;
        width = body.width >= width ?  width : body.width;
        height = body.width * 1.1947;


        this.setSize({
          game: {
            width: width,
            height: maxHeight,
          },
          table: {
            width: width,
            height: height >= maxHeight * 0.72 ? maxHeight * 0.72 : height,
          },
          utilities: {
            width: width,
            height: height >= maxHeight * 0.72 ? maxHeight * 0.28 : maxHeight - height,
          },
          gift: {
            height: parseInt(((width - 26) / 5) * 1.432, 10),
          },
          talk: {
            height: parseInt(((width - 26) / 6.232) - 16, 10)
          }
        });
      }
    }
  }

  get keepConnect(){
    return this._keepConnect;
  }

  /**
   * Метод для ужержания соединения с сокетами и продолжения игры
   * @param {boolean} keep - удерживать или рвать
   */
  keep(keep) {
    this._keepConnect = keep;
  }

  closeApp(){
    this.setStage('connection');
    this._store.socket.emit('close-roulette');
  }
  /**
   * Переносит игрока в лобби
   * @param {=string} tid - предыдущий стол
   */
  stageLobby(tid) {
    if(this.stage === 'lobby') return;

    this.setStage('lobby');
    this._store.socket.emit('in-lobby', tid);
  }

  /**
   * Переносит игрока на игровой стол
   * @param {string} tid - текущий стол
   */
  stageTable(tid) {
    if(this.stage === 'table') return;

    this.setStage('table');
    this._store.socket.emit('in-table', tid);
  }
}

export default AppStore
