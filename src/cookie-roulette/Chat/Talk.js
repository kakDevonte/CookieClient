import './css/talk.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import CounterNewMessages from "./CounterNewMessages";

function Talk({store, data}) {
  const image = {
    backgroundImage: `url("${data.player.photo}")`
  };

  return (
    <article className="talk" onClick={ () => store.chat.clickOpenTalk(data.player) }>
      <i style={image} />
      <div className="content">
        <span>{data.player.name}</span>
        <span>{data.lastMessage}</span>
      </div>
      <div className="counter">
        <CounterNewMessages count={data.count} />
      </div>
    </article>
  );
}

export default inject('store')( observer(Talk) );