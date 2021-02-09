import './css/your-turn-tooltip.css';

import React from "react";
import {inject, observer} from "mobx-react";

function YourTurnTooltip({allow, state}) {

  const className = () => {
    if(allow && state !== 'pending') {
      return 'your-turn-tooltip enabled';
    } else {
      return 'your-turn-tooltip';
    }
  };

  return (
    <div className={ className() }>
      Твой ход!<br/>Нажми на бутылочку,<br/>чтобы крутить!
    </div>
  );
}

export default inject('store')( observer(YourTurnTooltip) );