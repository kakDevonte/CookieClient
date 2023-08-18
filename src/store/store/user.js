import { action, makeObservable, observable } from "mobx";
import bridge_moc from "@vkontakte/vk-bridge-mock";
import bridge_real from "@vkontakte/vk-bridge";
import common from "../../config/common";
import { crypt } from "../../helpers/Common";
//'production'
const bridge = bridge_real;
// process.env.NODE_ENV === "development" ? bridge_moc : bridge_real;
//const bridge = bridge_real;

class UserStore {
  _data = {};
  _params = window.location.search.slice(1);
  _stateModal = "";
  _cookieCount = 0;
  _bottleRotate = 0;
  _isSubscribe = false;
  _money = 0;
  _token = "";
  _isDelete = false;

  constructor(store) {
    makeObservable(this, {
      _data: observable,
      _stateModal: observable,
      _cookieCount: observable,
      _bottleRotate: observable,
      _isSubscribe: observable,
      _token: observable,
      _money: observable,
      _isDelete: observable,

      setData: action,
      updatePersonalInfo: action,
      setKissCounter: action,
    });

    this._store = store;
    //this.auth();
  }

  get stateModal() {
    return this._stateModal;
  }
  get cookieCount() {
    return this._cookieCount;
  }
  get token() {
    return this._token;
  }
  get isDelete() {
    return this._isDelete;
  }
  get isSubscribe() {
    return this._isSubscribe;
  }

  get bottleRotate() {
    return this._bottleRotate;
  }

  addRotate() {
    this._bottleRotate = this._bottleRotate + 1;
  }
  setIsSubscribe() {
    this._isSubscribe = true;
  }

  setStateModal(state) {
    if (state === this._stateModal) return;
    this._stateModal = state;
  }

  setToken(state) {
    if (state === this._token) return;
    this._token = state;
  }

  setIsDelete(state) {
    if (state === this._isDelete) return;
    this._isDelete = state;
  }

  toggleModal() {
    if (this._stateModal === "") {
      this.setStateModal(" opened");
    } else if (this._stateModal === " opened") {
      this.setStateModal("");
    }
  }

  auth = async () => {
    let info, data;

    if (process.env.REACT_APP_BOTTLE_APP) {
      await bridge.send("VKWebAppInit");
    }

    if (this._store.info) {
      info = this._store.info;
    } else {
      info = await bridge.send("VKWebAppGetUserInfo", {});
    }
    data = Object.assign({}, info);
    //+common.randomNumber(1,4)
    //убрать тень у поцелуев
    data.id = info.id + ""; //'random_'+
    //data.id = info.id;
    data.enterCounter = 2;
    data.kissCounter = 0;
    data.cookieCounter = 0;
    data.giftsCounter = 0;
    data.gifts = [];
    data.inventory = [];
    data.messages = [];
    data.photo_200 = info.photo_max_orig; //photo_max_orig

    data.platform = this._store.platform;

    //common.randomiseUser(data);

    this.setData(data);
  };

  get data() {
    return this._data;
  }
  get id() {
    return this.data.id;
  }
  get token() {
    return this._token;
  }

  setData(data) {
    this._data = data;
  }

  buyCookies(count) {
    this._store.socket.emit("buy-cookie", { uid: this.data.id, count: count });
  }

  setAdult() {
    this._store.socket.emit("set-adult", { uid: this.data.id });
  }

  sendComplain(data) {
    this._store.socket.emit("send-report", data);
  }

  deleteProfile() {
    this._store.socket.emit("delete-profile", {
      uid: this.data.id,
      tid: this._store.table.id,
    });
  }

  setKissCounter(count) {
    this._data.kissCounter = count;
  }

  setCookieCount(state) {
    if (state === this._cookieCount) return;
    this._cookieCount = state;
  }

  addMoney(value) {
    this._money += value;
  }
  updatePersonalInfo(res) {
    const data = this._data;

    if (res.enterCounter) data.enterCounter = res.enterCounter;
    if (res.kissCounter) data.kissCounter = res.kissCounter;
    data.cookieCounter = res.cookieCounter;
    this._money = res.cookieCounter;
    if (res.giftsCounter) data.giftsCounter = res.giftsCounter.receive;
    if (res.inventory) data.inventory = res.inventory;
    if (res.gifts) data.gifts = res.gifts;
    if (res.messages) data.messages = res.messages;
    if (res.isDelete) data.isDelete = res.isDelete;

    this._store.inventory.updateOwnerInventory();
  }

  emitUserInfo(socket) {
    const str = JSON.stringify({
      guest: this.data,
      uid: this.id,
      token: this.token,
    });

    // this._auth().then( () => {
    socket.emit("user-info", crypt(str));
    // socket.emit('user-info', {...this.data, token: this._token});
    // });
  }
}

export default UserStore;
