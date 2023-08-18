import { action, makeObservable, observable } from "mobx";

class InventoryStore {
  _state = "";
  _current = null;
  _player = null;
  _name = "";
  _sendGift = null;
  _mode = "global";

  _gifts = {};
  _emptyGift = {
    id: -1,
    name: "NotLoaded",
    hit: 0,
    cost: 0,
    grade: 0,
    image: "",
    category: [],
  };
  _owner = [];
  _inventory = new Map();

  constructor(store) {
    this._costSort = this._costSort.bind(this);
    this._inventory.set("owner", { name: "Мой инвентарь", gifts: [] });

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
      clickToggleInventory: action,
    });

    this._store = store;
  }

  get state() {
    return this._state;
  }
  get name() {
    return this._name;
  }
  get gifts() {
    return this._gifts;
  }
  get list() {
    return this._inventory;
  }
  get emptyGift() {
    return this._emptyGift;
  }
  get windowSendGift() {
    return this._sendGift;
  }
  get current() {
    return this._current;
  }
  get mode() {
    return this._mode;
  }

  setState(state) {
    if (state) {
      if (this._state === " opened") return;
      this._state = " opened";
    } else {
      if (this._state === "") return;
      this._state = "";
    }
  }

  setMode(mode) {
    this._mode = mode;
  }

  setName(name) {
    if (name === this._name) return;
    this._name = name;
  }

  setSendGift(data) {
    this._sendGift = data;
  }

  clickToggleInventory(seat, event) {
    // if(!event && event.target) return;
    if (this._mode !== "global" && this._state !== " opened") {
      let player = this._store.tutorial.getPlayer(seat);
      if (player) {
        this.setName(player.name);
        this._current = seat;
        this._player = player;
      }
      this.setState(true);
      return;
    }

    if (/cookie-selector|wrap-players/.test(event.target.className)) {
      if (this._state === " opened") {
        this._current = null;
        this._player = null;

        this.setState(false);
        return;
      }
      return;
    }
    if (!/player/.test(event.target.className)) return;
    if (!seat) seat = Number(event.target.getAttribute("data-index"));

    let player;

    if (this._mode === "global") {
      player = this._store.table.getPlayer(seat);
    } else {
      player = this._store.tutorial.getPlayer(seat);
    }

    if (player && player.id === this._store.user.id) {
      this._current = null;
      this._player = null;

      if (this._state === " opened") {
        this.setState(false);
        return;
      }
      return;
    }

    if (this._current === seat) {
      if (this._state === " opened") {
        this.setState(false);
      } else {
        if (!player) return;
        this.setState(true);
      }
    } else {
      if (this._state !== " opened") {
        this.setState(true);
      }

      if (!player) this.setState(false);
    }

    if (player) {
      this.setName(player.name);
      this._current = seat;
      this._player = player;
    }
  }

  clickPersonalMessage() {
    this._store.chat.clickChangeTypeChat("personal");
    this._store.chat.clickOpenTalk(this._player);
    this.clickToggleInventory(this._current, {
      target: { className: "wrap-players" },
    });
  }

  receiveGiftsData(data) {
    if (data) {
      this._gifts = data;
      this.updateInventory();
    }
  }

  updateInventory() {
    const that = this;
    const category = {
      hot: "Горячее",
      man: "Мужчинам",
      woman: "Женщинам",
      fun: "Забавные",
      hat: "Шляпы",
      cute: "Милые",
    };

    const groups = {};

    for (const id in this._gifts) {
      const gift = this._gifts[id];

      gift.category.forEach((value) => {
        if (!groups[value])
          groups[value] = { name: category[value], gifts: [] };
        groups[value].gifts.push(gift.id);
      });
    }

    pushToList("hot");
    pushToList("man");
    pushToList("woman");
    pushToList("cute");
    pushToList("fun");
    pushToList("hat");

    /////////////////////////////

    function pushToList(name) {
      if (groups[name]) {
        groups[name].gifts.sort(that._costSort);
        that._inventory.set(name, groups[name]);
      }
    }
  }

  _costSort(id, _id) {
    if (this._gifts[id] && this._gifts[_id]) {
      return this._gifts[id].cost > this._gifts[_id].cost;
    }
    return false;
  }

  updateOwnerInventory() {
    this._inventory.get("owner").gifts = this._store.user.data.inventory;
  }

  openConfirmSendGift(category, id) {
    if (this._mode === "global") {
      if (category !== "owner") {
        if (this._store.user.data.cookieCounter < this._gifts[id].cost) {
          if (this._store.os === "iOS") return;

          document.querySelector(".shop-cookies").click();
          return;
        }
      }
    } else {
      this._store.tutorial.setStep("giftSelected");
    }

    const data = {
      uid: this._store.user.id,
      tid: this._store.table.id,
      to: this._player.id,
      gid: id,
      buy: category !== "owner",
      category,
    };

    this._store.app.openBackLayer();
    this.setSendGift(data);
  }

  sendGift(decision) {
    if (decision) {
      if (this._mode === "global") {
        this._store.socket.emit("send-gift", this._sendGift);
        this.clickToggleInventory(null, {
          target: { className: "wrap-players" },
        });
        this._store.amplitude.sendGift(this._sendGift.buy);
      } else {
        this._store.tutorial.setStep("successGift");
        this.clickToggleInventory(null, {
          target: { className: "wrap-players" },
        });

        this._store.tutorial.receiveGift(
          this._sendGift.to,
          this._sendGift.gid,
          this._sendGift.uid
        );
      }
    } else {
      if (this._mode === "local") this._store.tutorial.setStep("giveGift");
    }

    this.setSendGift(null);
    this._store.app.closeBackLayer();
  }
}

export default InventoryStore;
