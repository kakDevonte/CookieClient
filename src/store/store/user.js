import {action, makeObservable, observable} from "mobx"
import bridge_moc from "@vkontakte/vk-bridge-mock"
import bridge_real from "@vkontakte/vk-bridge"
import common from "../../config/common"

const bridge = process.env.NODE_ENV === 'production' ? bridge_real : bridge_moc;

class UserStore {

    data = false;
    table = false;

    constructor (store) {
        makeObservable(this, {
            data: observable,
            table: observable,
            auth: action
        });

        this.store = store;

        this.auth();
    }

    auth = async () => {
        await bridge.send("VKWebAppInit");
        const result = await bridge.send('VKWebAppGetUserInfo');

        common.randomiseUser(result);
        result.id = result.id + '';

        this.data = result;
    }
}

export default UserStore
