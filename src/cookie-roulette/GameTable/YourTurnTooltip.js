import '../../css/your-turn-tooltip.css';

import React from "react";
import {inject, observer} from "mobx-react";

function YourTurnTooltip({store}) {

  const className = () => {
    if(store.game.allowClickRotate) {
      return 'your-turn-tooltip enabled';
    } else {
      return 'your-turn-tooltip';
    }
  };

  return (
    <div className={className()}>Твой ход!<br/>Нажми на пченеьку,<br/>чтобы крутить!</div>
  );
}

export default inject('store')( observer(YourTurnTooltip) );