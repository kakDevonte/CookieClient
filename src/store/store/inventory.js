import {action, makeObservable, observable} from "mobx";
//import Collection from "../../helpers/Collection";


class InventoryStore {
  _state = '';
  _current = null;
  _player = null;
  _name = '';

  _gifts = {};
  _owner = [];
  _inventory = new Map();

  constructor(store) {
    this._inventory.set('owner', {name: 'Мой инвентарь', gifts: []});

    makeObservable(this, {
      _state: observable,
      _name: observable,
      _gifts: observable,
      _owner: observable,
      _inventory: observable,

      setState: action,
      setName: action,
      updateInventory: action,
      sendGift: action,
      updateOwnerInventory: action
    });

    this._store = store;
    this.updateInventory();
  }

  get state() { return this._state; }
  get name() { return this._name; }
  get gifts() { return this._gifts; }
  get list() { return this._inventory; }

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

  _loadGiftList(){
    const gifts = {
      1: {
        id: 1,
        name: "Роза",
        hit: 0,
        cost: 2,
        grade: 1,
        image: 'https://cookieapp.ru/img/gifts/1_%D0%A0%D0%BE%D0%B7%D0%B0.png',
        category: ['hot', 'woman']
      },
      4: {
        id: 4,
        name: "Виски",
        hit: 1,
        cost: 2,
        grade: 1,
        image: 'https://cookieapp.ru/img/gifts/8_%D0%92%D0%B8%D1%81%D0%BA%D0%B8.png',
        category: ['man']
      },
      18: {
        id: 18,
        name: "Плетка",
        hit: 1,
        cost: 7,
        grade: 2,
        image: 'https://cookieapp.ru/img/gifts/16_%D0%9F%D0%BB%D1%91%D1%82%D0%BA%D0%B0.png',
        category: ['hot', 'fun']
      }
    };

    this._gifts = gifts;
  }

  updateInventory() {
    const that = this;
    const category = {
      hot: 'Горячее',
      man: 'Мужчинам',
      woman: 'Женщинам',
      fun: 'Забаные'
    };

    const groups = {};

    this._loadGiftList();

    for(const id in this._gifts) {
      const gift = this._gifts[id];

      gift.category.forEach((value) => {
        if(!groups[value]) groups[value] = {name: category[value], gifts: []};
        groups[value].gifts.push(gift.id);
      });
    }

    pushToList('hot');
    pushToList('man');
    pushToList('woman');
    pushToList('fun');

    /////////////////////////////

    function pushToList(name) {
      if(groups[name]) {
        that._inventory.set(name, groups[name]);
      }
    }
  }

  updateOwnerInventory() {
    this._inventory.get('owner').gifts = this._store.user.data.inventory;
  }

  setOwnGift(id, count) {
    this._owner[id].count = count;
  }

  sendGift(type, id) {
    if(type === "owner") {
      let gift, index;

      index = this._store.user.data.inventory.findIndex((gift) => gift.id === id);
      gift = this._store.user.data.inventory[index];
      gift.count--;

      if(gift.count === 0) {
        this._store.user.data.inventory.splice(index, 1);
      }
    }
  }
}

export default InventoryStore;