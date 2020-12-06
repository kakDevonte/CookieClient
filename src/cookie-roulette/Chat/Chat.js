import './css/chat.css'

import React from 'react';
import {inject, observer} from "mobx-react";

import CommonChat from "./CommonChat";
import PersonalChat from "./PersonalChat";

function Chat({store}) {
  const className = (common, type) => {
    if(common) return type === 'common' ? 'selected' : '';
    return type === 'personal' ? 'selected' : '';
  };

  return (
    <article className="chat">
      <header>
        <div
          className={ className(true, store.chat.typeChat) }
          onClick={ () => store.chat.clickChaneTypeChat('common') }
        >
          Общий чат
        </div>
        <div
          className={ className(false, store.chat.typeChat) }
          onClick={ () => store.chat.clickChaneTypeChat('personal') }
        >
          <span>Личные сообщения <em>10</em></span>
        </div>
      </header>
        <CommonChat active={ className(true, store.chat.typeChat) } />
        <PersonalChat active={ className(false, store.chat.typeChat) } />
    </article>
  );
}

export default inject('store')( observer(Chat) );