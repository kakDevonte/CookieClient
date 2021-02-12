import './css/cookie-selector.css';

import React from "react";
import {inject, observer} from "mobx-react";

function CookieSelector({state, allow, rotate, click}) {
  const
    style = () => {
      const style = {};

      if(allow) style.cursor = 'pointer';

      return style;
    },

    classname = () => {
      if(state === 'pending') return 'cookie-selector hide';
      if(rotate) return 'cookie-selector rotate';
      return 'cookie-selector';
    };

  return (
    <div className={ classname() }>
      <div
        className="image-selector-bottle center-X"
        onClick={ click }
        style={ style() }
      />
    </div>
  )
}

export default inject('store')( observer(CookieSelector) );