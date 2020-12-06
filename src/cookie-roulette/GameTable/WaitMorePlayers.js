import './css/wait-players.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function WaitMorePlayers({store}) {
  const className = () => {
    if(store.game.state === 'pending') return 'wait-players show';
    return 'wait-players';
  };

  return (
    <div className={className()}>
      <header>Недостаточно<br/>игроков</header>
      <span>Ожидаем наполнения<br/>стола</span>
    </div>
  )
}

export default inject('store')( observer(WaitMorePlayers) );