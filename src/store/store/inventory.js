import {action, makeObservable, observable} from "mobx";
//import Collection from "../../helpers/Collection";


class InventoryStore {
  _state = '';
  _current = null;
  _player = null;
  _name = '';

  constructor(store) {
    makeObservable(this, {
      _state: observable,
      _name: observable,

      setState: action,
      setName: action
    });

    this._store = store;
  }

  get state() { return this._state; }
  get name() { return this._name}

  setState(state) {
    if(state){
      if(this._state === ' opened') return;
      this._state = ' opened';
    } else{
      if(this._state === '') return;
      this._state = '';
    }
  }

  setName(name) {
    if(name === this._name) return;
    this._name = name;
  }

  clickToggleInventory(seat) {
    const player = this._store.table.getPlayer(seat);

    if(player && player.id === this._store.user.id) {
      this._current = null;
      this._player = null;

      if(this._state === ' opened') {
        this.setState(false);
        return;
      }
      return;
    }

    if(this._current === seat) {
      if(this._state === ' opened') {
        this.setState(false);
      } else {
        if(!player) return;
        this.setState(true);
      }
    } else {
      if(this._state !== ' opened') {
        this.setState(true);
      }

      if(!player) this.setState(false);
    }

    if(player) {
      this.setName(player.name);
      this._current = seat;
      this._player = player;
    }
  }

  clickPersonalMessage(){
    this._store.chat.clickChangeTypeChat('personal');
    this._store.chat.clickOpenTalk(this._player);
    this.clickToggleInventory(this._current);
  }
}

export default InventoryStore;