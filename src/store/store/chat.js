import {action, makeObservable, observable} from "mobx";
import Collection from "../../helpers/Collection";

const chatMessageLimit = 50;

class ChatStore {
  _messages = new Map();
  _personal = new Map();
  _typeChat = 'common';
  _text = '';
  _talkState = '';
  _talkPlayer = {id: null};
  _countNewMessages = 0;

  constructor(store) {
    makeObservable(this, {
      _messages: observable,
      _personal: observable,
      _text: observable,
      _typeChat: observable,
      _talkState: observable,
      _talkPlayer: observable,
      _countNewMessages: observable,

      updateMessages: action,
      setText: action,
      setTypeChat: action,
      setTalkState: action,
      setTalkPlayer: action,
      _talkRead: action
    });

    this._store = store;
  }

  get messages() { return this._messages; }
  get talks() { return this._personal; }
  get text() { return this._text; }
  get typeChat(){ return this._typeChat; }
  get talkState(){ return this._talkState; }
  get talkPlayer(){ return this._talkPlayer; }
  get countNewMessages () { return this._countNewMessages; }
  get talkClosed() {
    const talk = this._personal.get(this._talkPlayer.id);

    if(talk) return talk.messages.get('talk-closed');
  }

  get personalMessages() {
    const talk = this._personal.get(this._talkPlayer.id);

    if(talk) {
      return talk.messages;
    }else{
      return [];
    }
  }

  setTypeChat(type) {
    if(this._typeChat === type) return;
    this._typeChat = type;
  }

  setTalkState(state){
    if(this._talkState === state) return;
    this._talkState = state;
  }

  setTalkPlayer(player) {
    if(this._talkPlayer.id === player.id) return;
    this._talkPlayer = player;
  }

  setText(value) {
    if(this._text === value) return;
    this._text = value;
  }

  // setCountNewMessages(count) {
  //   if(this._countNewMessages === count) return;
  //   this._countNewMessages = count;
  // }

  input(event){
    if( event.key === 'Enter' ) return;
    this.setText(event.target.value);
  }

  send(event, to) {
    if(event.key !== 'Enter') return;

    const text = this._text.trim();
    if(text === '') return;

    const message = {
      from: this._store.user.id,
      text: text,
      to: to
    };

    console.log('send', message);

    this.setText('');
    this._store.socket.emit('user-message', message);
  }

  updateMessages(list) {
    let uid;

    if(list === 'clear') {
      this._personal.clear();
      this._messages.clear();
    } else {
      list.forEach((message) => {
        if(message.to) {
          uid = message.to.id === this._store.user.id ? message.from.id : message.to.id;
          this._updatePersonalMessages(message, uid);
        } else {
          this._updateCommon(message);
        }
      });
    }
  }

  _updateCommon(message) {
    const messages = this._messages;

    if(messages.get(message.id)) return;
    messages.set(message.id, message);

    ChatStore._checkLimit(messages);
  }

  _updatePersonalMessages(message, uid) {
    let talk;

    talk = this._getTalk(uid);
    talk.date = message.date;
    talk.lastMessage = message.text;

    if(this._needCounted(uid)) {
      talk.count++;
      this._countNewMessages++;
    }

    if(talk.messages.get(message.id)) return;
    talk.messages.set(message.id, message);

    ChatStore._checkLimit(talk.messages);

    this._personal.set(uid, talk);
  }

  _needCounted(id){
    if(this._talkState === ' opened' && this._talkPlayer.id === id) return;
    return true;
  }

  static _checkLimit(messages) {
    if(messages.size > chatMessageLimit) {
      Collection.remove(messages, 0);
    }
  }

  _getTalk(uid) {
    let talk = this._personal.get(uid);

    if(talk) return talk;

    const [player, seat] = this._store.table.findPlayer(uid);

    talk = {
      player,
      seat,
      messages: new Map(),
      count: 0,
      date: null
    };

    this._personal.set(uid, talk);

    return talk;
  }

  clickChangeTypeChat(type) {
    if(type === 'common') this.setTypeChat('common');
    if(type === 'personal') this.setTypeChat('personal');
  }

  clickOpenTalk(player){
    console.log(player.id);
    this.setTalkPlayer(player);
    this._talkRead(player.id);
    this.setTalkState(' opened');
  }

  clickBackToPersonalMessages() {
    this.setTalkState('');
  }

  _talkRead(id) {
    const talk = this._personal.get(id);

    if(talk){
      this._countNewMessages -= talk.count;
      talk.count = 0;
    }
  }
}

export default ChatStore;