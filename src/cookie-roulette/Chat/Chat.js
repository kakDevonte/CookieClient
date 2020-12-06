import './css/chat.css'

import React from 'react';
import {inject, observer} from "mobx-react";

import Messages from "./Messages";
import Input from "./Input";

function Chat({store}) {
  return (
    <article className="chat">
      <header>
        <div className="selected">Общий чат</div>
        <div>
          <span>Личные сообщения <em>10</em></span>
        </div>
      </header>
      <Messages />
      <footer>
        <Input />
        <input type="button" value="►" onClick={ () => store.chat.send({key: 'Enter'}) }/>
      </footer>
    </article>
  );
}

export default inject('store')( observer(Chat) );