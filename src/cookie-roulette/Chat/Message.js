import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import common from "../../config/common";

function Message({store, message, container}) {

  useEffect(() => {
    if(container) container.scrollTop = container.scrollHeight;
  }, []);


  if(message.from === 'server-greetings') {
    return (
      <article title={common.getNormalDate(message.date, false, true)} className="message">
        <legend><span className={'colored-' + 1}>{message.text}</span></legend>
      </article>
    );
  }

  let [player, seat] = store.table.findPlayer(message.from);

  if(!player) return ;

  if(store.user.id === message.from) {
    return (
      <article title={common.getNormalDate(message.date, false, true)} className="message my-message">
        <legend>Вы говорите: </legend>{message.text}
      </article>
    );
  }

  return (
    <article title={common.getNormalDate(message.date, false, true)} className="message">
      <legend><span className={'colored-' + seat}>{player.name}</span> говорит: </legend>{message.text}
    </article>
  );
}

export default inject('store')( observer(Message) );