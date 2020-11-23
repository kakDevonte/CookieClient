import AppStore from "./store/app";
import UserStore from "./store/user";
import GameStore from "./store/game";

class Store {
    constructor() {
        this.app = new AppStore(this);
        this.user = new UserStore(this);
        this.game = new GameStore(this);
    }
}

export default Store;
