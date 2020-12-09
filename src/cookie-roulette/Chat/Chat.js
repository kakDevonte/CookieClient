import './css/chat.css'

import React from 'react';
import {inject, observer} from "mobx-react";

import CommonChat from "./CommonChat";
import PersonalChat from "./PersonalChat";
import CounterNewMessages from "./CounterNewMessages";

function Chat({store}) {
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
          onClick={ () => store.chat.clickChangeTypeChat('common') }
        >
          Общий чат
        </div>
        <div
          className={ className(false, type) }
          onClick={ () => store.chat.clickChangeTypeChat('personal') }
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