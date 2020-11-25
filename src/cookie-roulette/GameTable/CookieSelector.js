import React from "react";
import {inject, observer} from "mobx-react";

function CookieSelector({store}) {
  const
    angle = [ 0, 45, 90, 135, 180, 225, 270, 315, 360],

    style = {
      transform: `translate(-50%, -33%) rotate(${angle[store.game.targetSeat]}deg)`
    };

  return (
    <div className='cookie-selector' style={style}/>
  )
}

export default inject('store')( observer(CookieSelector) );