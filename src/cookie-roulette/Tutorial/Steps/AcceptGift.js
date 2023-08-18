import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function AcceptGift({store}) {
  const tutorial = store.tutorial;
  const player = store.tutorial._players.get(1);

  useEffect(() => {
    tutorial.openShadowLayer();
    tutorial._accentItem('.player.p0');
  }, []);
    console.log("получаем подарок 1")

  return (
    <div className="accept-gift-step info center-X" >
      <span className="info-header">Бла бла Подарок!</span>
      <p>
        Смотри, { player.name } угостил тебя коктейлем! Кажется, ты ему нравишься.
      </p>
      <p>Давай сделаем ему ответный подарок.</p>
      <div
        className="button-proceed-tutorial center-X"
        onClick={ () => store.tutorial.setStep('openInventory') }>
        Учиться дарить подарок!
      </div>
    </div>
  );
}

export default inject('store')( observer(AcceptGift) );