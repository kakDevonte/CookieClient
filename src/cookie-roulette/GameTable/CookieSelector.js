import './css/cookie-selector.css';

import React from "react";
import {inject, observer} from "mobx-react";

function CookieSelector({store}) {
  const
    style = () => {
      const style = {};

      if(store.game.allowClickRotate){
        style.cursor = 'pointer';
      }

      return style;
    },

    classname = () => {
      if(store.game.state === 'pending') return 'cookie-selector hide';
      if(store.game.rotateCookie) return 'cookie-selector rotate';
      return 'cookie-selector';
    };

  return (
    <div
      className={ classname() }
      style={ style() }
      onClick={ () => store.game.clickRotateCookie() }
    ><div />
    </div>
  )
}

export default inject('store')( observer(CookieSelector) );