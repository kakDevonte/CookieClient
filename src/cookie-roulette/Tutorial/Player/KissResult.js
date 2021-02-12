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
    const isActive = index === store.tutorial.activeSeat;
    let target, active, left, top;

    active = document.querySelector('.player.p' + store.tutorial.activeSeat);
    target = document.querySelector('.player.p' + store.tutorial.targetSeat);

    if(active && target) {
      [left, top] = common.calculateMovePosition(active, target, isActive);

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