import './css/turns-count-tooltip.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function TurnCountTooltip({store}) {
  const text = () => {
    const turns = store.game.turnsRemain;

    if(turns === 0)
      return 'Ваш ход!';

    if(turns)
      return `Осталось ходов: ${turns} `;
  };

  return (
    <div className="cookie-tooltip">
      { text() }
      <div className='arrow-down' />
    </div>
  );
}

export default inject('store')( observer(TurnCountTooltip) );