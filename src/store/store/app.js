import {action, makeObservable, observable} from "mobx";

class AppStore {

  _version = 1;
  _stage = 'connection';

  constructor (store) {
    makeObservable(this, {
      _version: observable,
      _stage: observable,

      stage: action,
      version: action
    });
    this._store = store;
  }

  get version() { return this._version; }
  get stage() { return this._stage; }

  set version(version) { this._version = version; }
  set stage(stage) { this._stage = stage; }

  stageLobby() {
    if(this.stage === 'lobby') return;

    this.stage = 'lobby';
    this._store.socket.emit('in-lobby');
  }

  stageTable(tid) {
    if(this.stage === 'table') return;

    this.stage = 'table';
    this._store.socket.emit('in-table', tid);
  }
}

export default AppStore
