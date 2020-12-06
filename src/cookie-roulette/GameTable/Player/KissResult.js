import './css/kiss-result.css';

import React, { useState, useEffect } from 'react';
import {inject, observer} from "mobx-react";
import common from "../../../config/common";

function KissResult({store, index, delay}){
  const [style, setStyle] = useState({
      left: common.randomNumber(-25, 25) + 'px',
      top: common.randomNumber(-30, 30) + 'px',
      animationDelay: `${delay}s, ${delay + 200}ms, ${delay + 2700}ms`
    }
  );

  useEffect(() => {
    setTimeout(() => calculateMove(), 25 + delay);
  }, []);

  const calculateMove = () => {
    const isActive = index === store.game.activeSeat;
    let target, active, left, top;

    active = document.querySelector('.player.p' + store.game.activeSeat);
    target = document.querySelector('.player.p' + store.game.targetSeat);

    if(active && target) {
      active = active.getBoundingClientRect();
      target = target.getBoundingClientRect();

      left = parseInt(active.x - target.x, 10);
      top = parseInt(active.y - target.y, 10);

      if(left < 0) left = left * -1;
      if(top < 0) top = top * -1;

      if(isActive) {
        if(active.x > target.x) left = left * -1;
        if(active.y > target.y) top = top * -1;
      }else {
        if(active.x < target.x) left = left * -1;
        if(active.y < target.y) top = top * -1;
      }

      left += common.randomNumber(-20, 20);
      top += common.randomNumber(-20, 20);

      setStyle({
        left,
        top,
        animationDelay: `${delay}s, ${delay + 200}ms, ${delay + 2700}ms`
      });
    }
  };

  return (<div className="round-kiss-result" style={style}/>);
}

export default inject('store')( observer(KissResult) );