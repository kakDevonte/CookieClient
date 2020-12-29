import {action, makeObservable, observable} from "mobx";

class InventoryStore {
  _state = '';
  _current = null;
  _player = null;
  _name = '';
  _sendGift = null;

  _gifts = {};
  _emptyGift = {
      id: -1,
      name: "NotLoaded",
      hit: 0,
      cost: 0,
      grade: 0,
      image: '',
      category: []
  };
  _owner = [];
  _inventory = new Map();

  constructor(store) {
    this._costSort = this._costSort.bind(this);
    this._inventory.set('owner', {name: 'Мой инвентарь', gifts: []});

    makeObservable(this, {
      _state: observable,
      _name: observable,
      _gifts: observable,
      _owner: observable,
      _inventory: observable,
      _sendGift: observable,
      _current: observable,

      setState: action,
      setName: action,
      sendGift: action,
      updateInventory: action,
      updateOwnerInventory: action,
      setSendGift: action,
      clickToggleInventory: action
    });

    this._store = store;
  }

  get state() { return this._state; }
  get name() { return this._name; }
  get gifts() { return this._gifts; }
  get list() { return this._inventory; }
  get emptyGift() { return this._emptyGift; }
  get windowSendGift() { return this._sendGift; }
  get current() { return this._current };

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

  setSendGift(data) {
    this._sendGift = data;
  }

  clickToggleInventory(seat, event) {
    if(event && !/player/.test(event.target.className)) return;

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

  receiveGiftsData(data){
    if(data){
      this._gifts = data;
      this.updateInventory();
    }
  }

  updateInventory() {
    const that = this;
    const category = {
      hot: 'Горячее',
      man: 'Мужчинам',
      woman: 'Женщинам',
      fun: 'Забавные',
      hat: 'Шляпы',
      cute: 'Милые'
    };

    const groups = {};

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
    pushToList('cute');
    pushToList('fun');
    pushToList('hat');

    /////////////////////////////

    function pushToList(name) {
      if(groups[name]) {
        groups[name].gifts.sort(that._costSort);
        that._inventory.set(name, groups[name]);
      }
    }
  }

  _costSort(id, _id){
    if(this._gifts[id] && this._gifts[_id]) {
      return this._gifts[id].cost > this._gifts[_id].cost;
    }
    return false;
  }

  updateOwnerInventory() {
    this._inventory.get('owner').gifts = this._store.user.data.inventory;
  }

  openConfirmSendGift(category, id) {
    if(category !== 'owner') {
      if(this._store.user.data.cookieCounter < this._gifts[id].cost) {
        if(this._store.os === 'iOS') return;

        document.querySelector('.shop-cookies').click();
        return;
      }
    }

    const data = {
      tid: this._store.table.id,
      from: this._store.user.id,
      to: this._player.id,
      gid: id,
      buy: category !== 'owner',
      category
    };

    this._store.app.openBackLayer();
    this.setSendGift(data);
  }

  sendGift(decision) {
    if(decision) {
      this._store.socket.emit('send-gift', this._sendGift);
    }

    this.setSendGift(null);
    this._store.app.closeBackLayer();
  }
}

export default InventoryStore;