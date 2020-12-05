import '../../css/chat.css'

import React from 'react';
import {inject, observer} from "mobx-react";
import common from "../../config/common";


function Chat({store}) {
  const className = (id) => {
    if(store.user.id === id) return 'message my-message';
    return 'message';
  };

  const message = (message) => {
    const n = common.randomNumber(1, 8);

    if(message.from === 'server-greetings') {
      return (
        <article key={message.id} title={message.date} className={className()}>
          <legend><span className={'colored-' + n}>{message.text}</span></legend>
        </article>
      );
    }

    return (
      <article key={message.id} title={message.date} className={className()}>
        <legend><span className={'colored-' + n}>{message.from}</span> говорит: </legend>{message.text}
      </article>
    );
  };

  const chat = () => {
    const m = [];

    store.chat.messages.forEach((value, key) => {
      m.push(message(value));
    });

    return m;
  };

  return (
    <article className="chat">
      <header>
        <div className="selected">Общий чат</div>
        <div>
          <span>Личные сообщения <em>10</em></span>
        </div>
      </header>
      <section className="messages">
        { chat() }
      </section>
      <footer>
        <input
          type="text"
          value={ store.chat.text }
          placeholder="Написать в чат"
          onKeyPress={ event => store.chat.send(event) }
          onChange={ event => store.chat.input(event) }
        />
        <input type="button" value="►"/>
      </footer>
    </article>
  );
}

/*
<article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
<article className="message"><legend><span className={n}>Василий</span> говорит: </legend>Привет мир!</article>
<article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
<article className="message my-message"><legend>Вы говорите: </legend>фроыво оыырвфры оымвоывр мы нып овиоы пы впыом нвп офыавымпфо авфым пафывр мрыфм </article>
<article className="message"><legend><span className={n}>Василий</span> говорит: </legend>Привет мир!</article>
<article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
<article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
<article className="message"><legend><span className={n}>Василий</span> говорит: </legend>Привет мир!</article>
<article className="message my-message"><legend>Вы говорите: </legend>Привет мир!</article>
 */

export default inject('store')( observer(Chat) );