import {action, makeObservable, observable} from "mobx";

class Chat {
  _messages = new Map();
  _personal = new Map();
  _text = '';

  constructor(store) {
    makeObservable(this, {
      _messages: observable,
      _personal: observable,
      _text: observable,

      updateMessages: action,
      input: action
    });

    this._strore = store;
  }

  get messages() {
    return this._messages;
  }

  get personalMessages() {
    return this._personal;
  }

  get text() {
    return this._text;
  }

  input(event){
    if( event.key === 'Enter' ) return;
    this._text = event.target.value;
  }


  send(event, to) {
    if(event.key !== 'Enter') return;

    const message = {
      from: this._strore.user.id,
      text: event.target.value,
      to
    };

    //console.log(message);

    this._strore.socket.emit('user-message', message);
  }

  updateMessages(list, personal) {
    const messages = personal ? this._personal : this._messages;

    list.forEach((message) => {
      if(messages.get(message.id)) return;
      messages.set(message.id, message);
    });
  }
}

export default Chat;