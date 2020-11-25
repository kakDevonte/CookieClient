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

      data: action
    });

    this._store = store;
    this._auth();
  }

  _auth = async () => {
    await bridge.send("VKWebAppInit");
    const result = await bridge.send('VKWebAppGetUserInfo');

    common.randomiseUser(result);
    result.id = result.id + '';

    this.data = result;
  };

  get data(){ return this._data; }
  get id() { return this.data.id; }

  set data(data){ this._data = data; }

  emitUserInfo(socket) {
    socket.emit('user-info', this.data);
  }
}

export default UserStore
