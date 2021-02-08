import './css/talk.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import CounterNewMessages from "./CounterNewMessages";
import TalkTimeMessage from "./TalkTimeMessage";

function Talk({store, data}) {
  const image = {
    backgroundImage: `url("${data.player.photo}")`
  };

  return (
    <article
      className="talk"
      style={store.app.size.talk}
      onClick={ () => store.chat.clickOpenTalk(data.player) }
    >
      <i style={image} />
      <div className="content">
        <span>{data.player.fullName}</span>
        <span>{data.lastMessage}</span>
      </div>
      <div className="counter">
        <CounterNewMessages count={data.count} />
        <TalkTimeMessage count={data.count} date={data.date} />
      </div>
    </article>
  );
}

export default inject('store')( observer(Talk) );