import {action, makeObservable, observable} from "mobx"
import bridge_moc from "@vkontakte/vk-bridge-mock"
import bridge_real from "@vkontakte/vk-bridge"
import common from "../../config/common"

const bridge = process.env.NODE_ENV === 'production' ? bridge_real : bridge_moc;

class UserStore {

  _data = false;

  constructor (store) {
    makeObservable(this, {
      _data: observable,

      setData: action
    });

    this._store = store;
    this._auth();
  }

  _auth = async () => {
    await bridge.send("VKWebAppInit");
    const result = await bridge.send('VKWebAppGetUserInfo');

    common.randomiseUser(result);
    result.id = result.id + '';
    result.kissCounter = 0;
    result.cookieCounter = 0;
    result.inventory = [];
    result.messages = [];

    this.setData(result);
  };

  get data(){ return this._data; }
  get id() { return this.data.id; }

  setData(data){ this._data = data; }

  setKissCounter(count) {
    const data = this.data;

    data.kissCounter = count;
    this.setData(data);
  }

  updatePersonalInfo(res) {
    const data = this.data;

    if(res.kissCounter) data.kissCounter = res.kissCounter;
    if(res.cookieCounter) data.cookieCounter = res.cookieCounter;
    if(res.inventory) data.inventory = res.inventory;
    if(res.messages) data.messages = res.messages;

    this.setData(data);
  }

  emitUserInfo(socket) {
    socket.emit('user-info', this.data);
  }
}

export default UserStore
