import React from "react";
import {inject, observer} from "mobx-react";

function CookieSelector({store}) {
  const
    angle = [ 0, 45, 90, 135, 180, 225, 270, 315, 360],

    style = () => {
      if(store.game.targetSelector == null)
        return {
          transform: `rotate(0deg)`
        };
      return {
        transform: `rotate(${angle[store.game.targetSelector]}deg)`
      }
    },

    classname = () => {
      if(store.game.rotateCookie) return 'cookie-selector rotate';
      return 'cookie-selector';
    };

  return (
    <div className={classname()} style={style()}><div /></div>
  )
}

export default inject('store')( observer(CookieSelector) );