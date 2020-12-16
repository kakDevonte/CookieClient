import './css/sending-gift.css';

import React, { useState, useEffect } from 'react';
import {inject, observer} from "mobx-react";
import common from "../../../config/common";

function SendingGift({store, index}){
  const image = store.inventory.gifts[store.game.giftReceived].image;
  const [style, setStyle] = useState({
      backgroundImage: `url(${image})`,
      left: '50%',
      top: '50%',
      animationDelay: `0s, 200ms, 2700ms`
    }
  );

  useEffect(() => {
    setTimeout(() => calculateMove(), 25);
  }, []);

  const calculateMove = () => {
    const isActive = index === store.game.activeSeat;
    let target, active, left, top;

    active = document.querySelector('.player.p' + store.game.activeSeat);
    target = document.querySelector('.player.p' + store.game.targetSeat);

    if(active && target) {
      [left, top] = common.calculateMovePosition(active, target, isActive);

      setStyle({
        backgroundImage: `url(${image})`,
        left,
        top,
        animationDelay: `0s, 200ms, 2700ms`
      });
    }
  };

  return (<div className="sending-gift" style={style}/>);
}

export default inject('store')( observer(SendingGift) );