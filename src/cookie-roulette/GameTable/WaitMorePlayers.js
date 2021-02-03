import './css/wait-players.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function WaitMorePlayers({state}) {
  const className = () => {
    if(state === 'pending') return 'wait-players show';
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