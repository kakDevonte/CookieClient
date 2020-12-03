import React, { useState, useEffect } from 'react';
import {inject, observer} from "mobx-react";
import common from "../../config/common";

function KissResult({store, index}){
  const [style, setStyle] = useState({
      left: '0',
      top: '0'
    }
  );

  useEffect(() => {
    setTimeout(() => calculateMove(), common.randomNumber(100, 1000));
  }, []);

  const calculateMove = () => {
    const isActive = index === store.game.activeSeat;
    let target, active, left, top;

    active = document.querySelector('.player.p' + store.game.activeSeat );
    target = document.querySelector('.player.p' + store.game.targetSeat);
    active = active.getBoundingClientRect();
    target = target.getBoundingClientRect();

    left = parseInt(active.x - target.x, 10);
    top = parseInt(active.y - target.y, 10);

    if(left < 0) left = left * -1;
    if(top < 0) top = top * -1;

    if(isActive) {
      if(active.x > target.x) left = left * -1;
      if(active.y > target.y) top = top * -1;
    } else {
      if(active.x < target.x) left = left * -1;
      if(active.y < target.y) top = top * -1;
    }

    setStyle({
      left,
      top
    });
  };

  return (<div className="round-kiss-result" style={style}/>);
}

// const animate = (active) => {
//   const indexC = active ? store.game.activeSeat : store.game.targetSeat;
//   const indexT = !active ? store.game.activeSeat : store.game.targetSeat;
//
//   let current = document.querySelector(`.player.p${indexT} .round-kiss-result`);
//   let target = document.querySelector(`.player.p${indexC}`);
//
//   const pc = current.getBoundingClientRect();
//   const pt = target.getBoundingClientRect();
//
//   let left, top;
//
//   left = pc.x - (pt.x + (pt.width * 0.65));
//   top  = pc.y - (pt.y + (pt.height * 0.65));
//
//   if(active) {
//     if(pc.x > pt.x) left = left * -1;
//     if(pc.y > pt.y) top = top * -1;
//   }else{
//     if(pc.x < pt.x) left = left * -1;
//     if(pc.y < pt.y) top = top * -1;
//   }
//
//   current.setAttribute('style', `left: ${left}px; top: ${top}px;`);
//
//   //setTimeout(() => {current.parentNode.removeChild(current)}, 3000);
// };

export default inject('store')( observer(KissResult) );