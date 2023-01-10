import {action, makeObservable, observable} from "mobx"
import bridge_moc from "@vkontakte/vk-bridge-mock"
import bridge_real from "@vkontakte/vk-bridge"
import common from "../../config/common"
//'production'
//const bridge = process.env.NODE_ENV === true ? bridge_real : bridge_moc;
const bridge = bridge_moc;
console.log(bridge);

class UserStore {

  _data = {};

  constructor (store) {
    makeObservable(this, {
      _data: observable,

      setData: action,
      updatePersonalInfo: action,
      setKissCounter: action,
    });

    this._store = store;
    //this.auth();
  }

  _auth = async () => {
    let info, data;

    if(process.env.REACT_APP_BOTTLE_APP) {
      await bridge.send("VKWebAppInit");
    }

    if(this._store.info) {
      info = this._store.info;
    } else {
      info = await bridge.send('VKWebAppGetUserInfo', {});
      console.log(info);
    }
    data = Object.assign({}, info);

    data.id = 'random_' + info.id;
    data.enterCounter = 0;
    data.kissCounter = 0;
    data.cookieCounter = 0;
    data.giftsCounter = 0;
    data.gifts = [];
    data.inventory = [];
    data.messages = [];

    data.platform = this._store.platform;

    //common.randomiseUser(data);

    this.setData(data);
  };

  get data(){ return this._data; }
  get id() { return this.data.id; }

  setData(data){ this._data = data; }

  buyCookies(count) {
    console.log({ uid: this.data.id, count: count });
   this._store.socket.emit('buy-cookie', { uid: this.data.id, count: count });
  }

  setKissCounter(count) {
    this._data.kissCounter = count;
  }

  updatePersonalInfo(res) {
    const data = this._data;

    if(res.enterCounter) data.enterCounter = res.enterCounter;
    if(res.kissCounter) data.kissCounter = res.kissCounter;
    if(res.cookieCounter) data.cookieCounter = res.cookieCounter;
    if(res.giftsCounter) data.giftsCounter = res.giftsCounter.receive;
    if(res.inventory) data.inventory = res.inventory;
    if(res.gifts) data.gifts = res.gifts;
    if(res.messages) data.messages = res.messages;

    this._store.inventory.updateOwnerInventory();
  }

  emitUserInfo(socket) {
    this._auth().then( () => {
      socket.emit('user-info', this.data);
    });
  }
}

export default UserStore;
