import './css/sending-gift.css';

import React, { useState, useEffect } from 'react';
import {inject, observer} from "mobx-react";
import common from "../../../config/common";

function SendingGift({data}){
  //const image = data.gift.image;
  const [style, setStyle] = useState({
      backgroundImage: `url(${data.gift.image})`,
      left: '5%',
      top: '0',
      animationDelay: `0s, 200ms, 2700ms`
    }
  );

  useEffect(() => {
    setTimeout(() => calculateMove(), 25);
  }, []);

  const calculateMove = () => {
    let target, active, left, top;

    active = document.querySelector('.player.p' + data.active[1]);
    target = document.querySelector('.player.p' + data.target[1] + ' .receive-gift');

    if(active && target) {
      [left, top] = common.calculateMovePosition(active, target, true);

      setStyle({
        backgroundImage: `url(${data.gift.image})`,
        left,
        top,
        animationDelay: `0s, 200ms, 2700ms`
      });
    }
  };

  return (<div className="sending-gift" style={style}/>);
}

export default inject('store')( observer(SendingGift) );