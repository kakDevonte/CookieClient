import AppStore from "./store/app";
import UserStore from "./store/user";
import GameStore from "./store/game";
import SocketStore from "./store/socket";
import TableStore from "./store/table";
import ChatStore from "./store/chat";
import InventoryStore from "./store/inventory";
import RatingStore from "./store/rating";
import AmplitudeStore from "./store/amplitudeStore";
import TutorialStore from "./store/tutorial";
import ShopStore from "./store/shop";
import ProfileStore from "./store/profile";

const n = Number,
  c = String.fromCharCode,
  m = "charCodeAt",
  delimiters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
  ],
  offset = 97,
  _X = String,
  _Y = "fromCharCode",
  _Z = Number,
  _y = "charCodeAt";

export { n, c, m, delimiters, offset, _Z, _X, _Y, _y };

class Store {
  constructor(os, info, platform) {
    this.history = null;
    this.location = null;
    this.os = os;
    this.info = info;
    this.platform = platform;

    this.app = new AppStore(this);
    this.socket = new SocketStore(this);
    this.user = new UserStore(this);
    this.tutorial = new TutorialStore(this);
    this.table = new TableStore(this);
    this.game = new GameStore(this);
    this.chat = new ChatStore(this);
    this.inventory = new InventoryStore(this);
    this.rating = new RatingStore(this);
    this.shop = new ShopStore(this);
    this.profile = new ProfileStore(this);
    this.amplitude = new AmplitudeStore(this);
  }
}

export default Store;
