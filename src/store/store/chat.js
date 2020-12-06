import {action, makeObservable, observable} from "mobx";
import Collection from "../../helpers/Collection";

const chatMessageLimit = 50;

class ChatStore {
  _messages = new Map();
  _personal = new Map();
  _typeChat = 'common';
  _text = '';

  constructor(store) {
    makeObservable(this, {
      _messages: observable,
      _personal: observable,
      _text: observable,
      _typeChat: observable,

      updateMessages: action,
      setText: action,
      setTypeChat: action
    });

    this._strore = store;
  }

  get messages() { return this._messages; }
  get personalMessages() { return this._personal; }
  get text() { return this._text; }
  get typeChat(){ return this._typeChat; }

  setTypeChat(type) {
    if(this._typeChat === type) return;
    this._typeChat = type;
  }

  setText(value) {
    if(this._text === value) return;
    this._text = value;
  }

  input(event){
    if( event.key === 'Enter' ) return;
    this.setText(event.target.value);
  }

  send(event, to) {
    if(event.key !== 'Enter') return;

    const text = this._text.trim();
    if(text === '') return;

    const message = {
      from: this._strore.user.id,
      text: text,
      to
    };

    this.setText('');
    this._strore.socket.emit('user-message', message);
  }

  updateMessages(list, personal) {
    const messages = personal ? this._personal : this._messages;

    list.forEach((message) => {
      if(messages.get(message.id)) return;
      messages.set(message.id, message);
    });

    if(messages.size > chatMessageLimit) {
      Collection.remove(messages, 0, messages.size - chatMessageLimit);
    }
  }

  clickChaneTypeChat(type) {
    if(type === 'common') this.setTypeChat('common');
    if(type === 'personal') this.setTypeChat('personal');
  }
}

export default ChatStore;