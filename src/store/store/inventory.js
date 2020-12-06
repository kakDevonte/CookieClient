import {action, makeObservable, observable} from "mobx";
//import Collection from "../../helpers/Collection";


class InventoryStore {
  _state = '';
  _current = null;
  _player = null;

  constructor(store) {
    makeObservable(this, {
      _state: observable,

      setState: action,
    });

    this._store = store;
  }

  get state() { return this._state; }

  setState(state) {
    if(state){
      if(this._state === ' opened') return;
      this._state = ' opened';
    } else{
      if(this._state === '') return;
      this._state = '';
    }
  }

  clickToggleInventory(seat) {
    const player = this._store.table.getPlayer(seat);

    console.log(player);

    if(this._current === seat) {
      if(this._state === ' opened') {
        this.setState(false);
      } else{
        if(!player) return;
        this.setState(true);
      }
    }else{
      if(this._state !== ' opened') {
        this.setState(true);
      }

      if(!player) this.setState(false);
    }

    if(player) {
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