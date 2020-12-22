import AppStore from "./store/app";
import UserStore from "./store/user";
import GameStore from "./store/game";
import SocketStore from "./store/socket";
import TableStore from "./store/table";
import ChatStore from "./store/chat";
import InventoryStore from "./store/inventory";

class Store {
    constructor(os) {
        this.os = os;
        this.app = new AppStore(this);
        this.socket = new SocketStore(this);
        this.user = new UserStore(this);
        this.table = new TableStore(this);
        this.game = new GameStore(this);
        this.chat = new ChatStore(this);
        this.inventory = new InventoryStore(this);
    }
}

export default Store;
