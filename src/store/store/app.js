import {action, makeObservable, observable} from "mobx";

class AppStore {

  _version = 1;
  _stage = 'connection';

  constructor (store) {
    makeObservable(this, {
      _version: observable,
      _stage: observable,

      setStage: action,
      setVersion: action
    });
    this._store = store;
  }

  get version() { return this._version; }
  get stage() { return this._stage; }

  setVersion(version) { this._version = version; }
  setStage(stage) { this._stage = stage; }


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
