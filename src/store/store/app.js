import {action, makeObservable, observable} from "mobx";

class AppStore {

  _version = 1;
  _stage = 'connection';
  _size = null;

  constructor (store) {
    this._calculateSizes();

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

  _calculateSizes () {
    let root, width, height;

    if(document) {
      root = document.querySelector('body');

      if(root) {
        root = root.getBoundingClientRect();
        width = root.height * 0.616;
        width = root.width >= width ?  width : root.width;
        height = root.width * 1.1947;

        this.setSize({
          game: {
            width: width,
            height: root.height,
          },
          table: {
            width: width,
            height: height >= root.height * 0.72 ? root.height * 0.72 : height,
          },
          utilities: {
            width: width,
            height: height >= root.height * 0.72 ? root.height * 0.28 : root.height - height,
          },
          gift: {
            height: ((width - 26) / 5) * 1.432
          }
        });
      }
    }
  }


  openApp(){
    //this._store.socket.emit('open-roulette');
    document.querySelector('#root').setAttribute('style', 'display: none');
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
