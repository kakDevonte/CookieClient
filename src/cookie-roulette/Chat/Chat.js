import './css/chat.css'

import React from 'react';
import {inject, observer} from "mobx-react";

import CommonChat from "./CommonChat";
import PersonalChat from "./PersonalChat";
import CounterNewMessages from "./CounterNewMessages";

function Chat({store, clickCommon, clickPersonal}) {
  const type = store.chat.typeChat;

  const className = (common, type) => {
    if(common) return type === 'common' ? 'selected' : '';
    return type === 'personal' ? 'selected' : '';
  };

  return (
    <article className="chat">
      <header>
        <div
          className={ className(true, type) }
          onClick={ clickCommon }
        >
          Общий чат
        </div>
        <div
          className={ className(false, type) }
          onClick={ clickPersonal }
        >
          <CounterNewMessages count={ store.chat.countNewMessages } />
          <span>Личные сообщения</span>
        </div>
      </header>
        <CommonChat active={ className(true, type) } />
        <PersonalChat
          active={ className(false, type) }
          talks={ store.chat.talks } />
    </article>
  );
}

export default inject('store')( observer(Chat) );