import './css/message.css';

import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import common from "../../config/common";

function Message({store, message, container}) {

  useEffect(() => {
    if(container) container.scrollTop = container.scrollHeight;
  }, []);


  if(message.from.id === 'server-greetings') {
    return (
      <article title={common.getNormalDate(message.date, false, true)} className="message">
        <legend><span className="colored-greetings">{message.text}</span></legend>
      </article>
    );
  }

  if(message.from.id === 'server-gift') {
    return (
      <article title={common.getNormalDate(message.date, false, true)} className="message gift">
        <legend><i className="center-Y" /><span>{message.text}</span></legend>
      </article>
    );
  }

  if(store.user.id === message.from.id) {
    return (
      <article title={common.getNormalDate(message.date, false, true)} className="message my-message">
        <legend>Вы говорите: </legend>{message.text}
      </article>
    );
  }

  if(message.to) {
    return (
      <article title={common.getNormalDate(message.date, false, true)} className="message">
        <legend><span className={'colored-' + message.from.seat}>{message.from.name}</span>: </legend>{message.text}
      </article>
    );
  }

  return (
    <article title={common.getNormalDate(message.date, false, true)} className="message">
      <legend><span className={'colored-' + message.from.seat}>{message.from.fullName}</span> говорит: </legend>{message.text}
    </article>
  );
}

export default inject('store')( observer(Message) );