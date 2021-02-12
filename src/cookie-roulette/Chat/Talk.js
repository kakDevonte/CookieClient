import './css/talk.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import CounterNewMessages from "./CounterNewMessages";
import TalkTimeMessage from "./TalkTimeMessage";

function Talk({store, data}) {
  const image = {
    backgroundImage: `url("${data.player.photo}")`
  };

  const openTalk = () => {
    if(store.chat.mode === 'global') {
      store.chat.clickOpenTalk(data.player);
    } else {
      store.tutorial.clickOpenTalk(data.player);
    }
  };

  return (
    <article
      className="talk"
      style={store.app.size.talk}
      onClick={ openTalk }
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