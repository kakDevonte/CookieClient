import React from "react";
import {inject, observer} from "mobx-react";

function CookieSelector({store}) {
  const
    angle = [ 0, 45, 90, 135, 180, 225, 270, 315, 360],

    style = () => {

      const style = {};

      if(store.game.targetSelector == null) {
        //style.transform = `rotate(0deg)`;
      }else{
        style.transform = `rotate(${angle[store.game.targetSelector]}deg)`;
      }

      if(store.game.allowClickRotate){
        style.cursor = 'pointer';
      }

      return style;
    },

    classname = () => {
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