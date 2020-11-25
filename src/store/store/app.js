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

  stageLobby() {
    if(this.stage === 'lobby') return;

    this.setStage('lobby');
    this._store.socket.emit('in-lobby');
  }

  stageTable(tid) {
    if(this.stage === 'table') return;

    this.setStage('table');
    this._store.socket.emit('in-table', tid);
  }
}

export default AppStore
