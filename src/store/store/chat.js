import { action, makeObservable, observable } from "mobx";
import Collection from "../../helpers/Collection";

const chatMessageLimit = 50;

class ChatStore {
  _messages = new Map();
  _personal = new Map();
  _typeChat = "common";
  _text = "";
  _talkState = "";
  _talkPlayer = { id: null };
  _countNewMessages = 0;
  _mode = "global";
  _state = "";
  _report = {
    name: "",
    id: null,
    text: "",
    date: null,
  };

  constructor(store) {
    makeObservable(this, {
      _messages: observable,
      _personal: observable,
      _text: observable,
      _typeChat: observable,
      _talkState: observable,
      _talkPlayer: observable,
      _countNewMessages: observable,
      _state: observable,
      _report: observable,

      updateMessages: action,
      setText: action,
      setTypeChat: action,
      setTalkState: action,
      setTalkPlayer: action,
      _talkRead: action,
      reopenTalk: action,
    });

    this._store = store;
  }

  get state() {
    return this._state;
  }
  get report() {
    return this._report;
  }
  get mode() {
    return this._mode;
  }
  get messages() {
    return this._messages;
  }
  get talks() {
    return this._personal;
  }
  get text() {
    return this._text;
  }
  get typeChat() {
    return this._typeChat;
  }
  get talkState() {
    return this._talkState;
  }
  get talkPlayer() {
    return this._talkPlayer;
  }
  get countNewMessages() {
    return this._countNewMessages;
  }
  get talkClosed() {
    const talk = this._personal.get(this._talkPlayer.id);

    if (talk) return talk.messages.get("talk-closed");
  }

  get personalMessages() {
    const talk = this._personal.get(this._talkPlayer.id);

    if (talk) {
      return talk.messages;
    } else {
      return [];
    }
  }

  setMode(mode) {
    this._mode = mode;
  }

  setReport(data) {
    this._report = data;
  }

  setState(state) {
    if (state === this._state) return;
    this._state = state;
  }

  toggleModal() {
    if (this._state === "") {
      this.setState(" opened");
    } else if (this._state === " opened") {
      this.setState("");
    }
  }

  setTypeChat(type) {
    if (this._typeChat === type) return;
    this._typeChat = type;
  }

  setTalkState(state) {
    if (this._talkState === state) return;
    this._talkState = state;
  }

  setTalkPlayer(player) {
    if (this._talkPlayer.id === player.id) return;
    this._talkPlayer = player;
  }

  setText(value) {
    if (this._text === value) return;
    this._text = value;
  }

  reopenTalk(player) {
    if (!player) return;

    const talk = this._personal.get(player.id);
    let message;

    if (talk && talk.messages.get("talk-closed")) {
      talk.messages.delete("talk-closed");
      message = Collection.takeLast(talk.messages);

      talk.date = message.date;
      talk.lastMessage = message.text;
    }
  }

  // setCountNewMessages(count) {
  //   if(this._countNewMessages === count) return;
  //   this._countNewMessages = count;
  // }

  input(event) {
    if (event.key === "Enter") return;
    if (event.target.value.length > 120) return;

    const result = event.target.value.replace(
      /[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu,
      ""
    );
    this.setText(result);
  }

  send(event, to) {
    if (event.key !== "Enter") return;
    // if (event.keyCode === 9) return;

    const toUser = this._store.table.findPlayer(to);

    if (this._store.app.stage !== "tutorial") {
      if (this._mode !== "global") if (!toUser[0] && !toUser[1]) return;
    }
    // if(this._store.table)

    const text = this._text.trim();
    if (text === "") return;

    if (text.match(/.+\.\w\w.*/gi)) return;

    const message = {
      uid: this._store.user.id,
      text: text,
      to: to,
    };

    this.setText("");

    if (this._mode === "global") {
      this._store.amplitude.trackMessages();
      this._store.socket.emit("user-message", message);
    } else {
      this.sendLocalMessage(this._store.user.id, text, to);

      if (this._store.tutorial.step === "writeMessage") {
        setTimeout(() => {
          this._store.tutorial.setStep("endTutorial");
        }, 2250);
      }
    }
  }

  sendLocalMessage(from, text, to) {
    const message = {
      id: new Date().getTime() + "",
      from: this._store.tutorial.fromInfo(from),
      text,
      date: Date.now(),
      to: to ? this._store.tutorial.fromInfo(to) : null,
      notice: !!to,
    };

    this.updateMessages([message]);
  }

  updateMessages(list) {
    let uid;

    if (list === "clear") {
      this._personal.clear();
      this._messages.clear();
    } else {
      list.forEach((message) => {
        if (message.to) {
          uid =
            message.to.id === this._store.user.id
              ? message.from.id
              : message.to.id;
          this._updatePersonalMessages(message, uid);
        } else {
          this._updateCommon(message);
        }
      });
    }
  }

  _updateCommon(message) {
    const messages = this._messages;

    if (messages.get(message.id)) return;
    messages.set(message.id, message);

    ChatStore._checkLimit(messages);
  }

  _updatePersonalMessages(message, uid) {
    let talk;

    talk = this._getTalk(uid);
    talk.date = message.date;
    talk.lastMessage = message.text;

    if (this._needCounted(uid) && message.notice) {
      talk.count++;
      this._countNewMessages++;
    }

    if (talk.messages.get(message.id)) return;
    talk.messages.set(message.id, message);

    ChatStore._checkLimit(talk.messages);

    this._personal.set(uid, talk);
  }

  _needCounted(id) {
    if (this._talkState === " opened" && this._talkPlayer.id === id) return;
    return true;
  }

  static _checkLimit(messages) {
    if (messages.size > chatMessageLimit) {
      Collection.remove(messages, 0);
    }
  }

  _getTalk(uid) {
    let talk = this._personal.get(uid);
    let player, seat;

    if (talk) return talk;

    if (this._mode === "global") {
      [player, seat] = this._store.table.findPlayer(uid);
    } else {
      [player, seat] = this._store.tutorial.findPlayer(uid);
    }

    talk = {
      player,
      seat,
      messages: new Map(),
      count: 0,
      date: null,
    };

    this._personal.set(uid, talk);

    return talk;
  }

  clickChangeTypeChat(type) {
    if (type === "common") this.setTypeChat("common");
    if (type === "personal") this.setTypeChat("personal");
  }

  clickOpenTalk(player) {
    this.setTalkPlayer(player);
    this._talkRead(player.id);
    this.setTalkState(" opened");
  }

  clickBackToPersonalMessages() {
    this.setTalkState("");
  }

  _talkRead(id) {
    const talk = this._personal.get(id);

    if (talk) {
      this._countNewMessages -= talk.count;
      talk.count = 0;
    }
  }
}

export default ChatStore;
