import React from 'react';
import {inject, observer} from "mobx-react";

function AnimationCookie({store}){
  const angle = [ 0, 45, 90, 135, 180, 225, 270, 315, 360];

  const style = () => {
    if(store.game.targetSelector !== null){

      const degrees = angle[store.game.targetSelector];

      return `
      .table .cookie-selector.rotate {
        animation-name: my-cookie-rotate, my-cookie-target;
        animation-duration: 0.8s, 0.6s;
        animation-timing-function: linear, linear;
        animation-delay: 0s, 2.4s;
        animation-iteration-count: 3, 1;
        animation-direction: normal, normal;
        animation-fill-mode: none, forwards;
      }
      
      @keyframes my-cookie-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes my-cookie-target{
        0% { transform: rotate(0deg); }
        100%{ transform: rotate(${degrees}deg); }
      }
    `;
    }

    return '';
  };

  return (
    <style type="text/css">{ style() }</style>
  );
}

export default inject('store') ( observer(AnimationCookie) );