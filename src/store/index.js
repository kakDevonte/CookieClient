import AppStore from "./store/app";
import UserStore from "./store/user";

class Store {
    constructor() {
        this.app = new AppStore(this);
        this.user = new UserStore(this);
    }
}

export default Store;
