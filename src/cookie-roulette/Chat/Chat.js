import './css/chat.css'

import React from 'react';
import {inject, observer} from "mobx-react";

import CommonChat from "./CommonChat";
import PersonalChat from "./PersonalChat";

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
          <span>Личные сообщения <em>10</em></span>
        </div>
      </header>
        <CommonChat active={ className(true, type) } />
        <PersonalChat active={ className(false, type) } />
    </article>
  );
}

export default inject('store')( observer(Chat) );