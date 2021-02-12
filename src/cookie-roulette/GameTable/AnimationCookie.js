import React from 'react';
import {inject, observer} from "mobx-react";

function AnimationCookie({seat, oldSeat}){
  const angle = [ 0, 45, 90, 135, 180, 225, 270, 315, 360];

  const style = () => {
    let degrees, d0, d1080, dStop;

    if(seat !== null){
      degrees = angle[seat];

      d0 = angle[oldSeat];
      d1080 = d0 + 360 + 360 + 360;

      dStop = degrees - d0;
      dStop = dStop >= 0 ? d1080 + dStop : d1080 + (360 + dStop);

      return `
      .roulette-table .cookie-selector{
        transform: rotate(${degrees}deg);
      }
      
      .roulette-table .cookie-selector.rotate {
        animation-name: my-cookie-rotate;
        animation-duration: 3s;
        animation-timing-function: cubic-bezier(.65,.1,.1,.85);
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
      }
      
      @keyframes my-cookie-rotate {
        0% { transform: rotate(${d0}deg); }
        100% { transform: rotate(${dStop}deg); }
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