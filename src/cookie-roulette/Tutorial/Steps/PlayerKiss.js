import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function PlayerKiss({store}) {
  const tutorial = store.tutorial;

  useEffect(() => {
    tutorial._disAccentAll();
    tutorial.updateKissData('open');
  }, []);

  return (
    <div className="player-kiss-step info center-X" >
      <span className="info-header">Нажми «Поцеловать»</span>
      <p>
        Это окно поцелуя. Оно будет появляться всякий раз,
        когда ты крутишь бутылочку или бутылочка указала на тебя,
        если ее  крутил другой игрок.</p>
      <p>
        Поцелуй - это знак внимания. Если тебе симпатичен другой игрок,
        смело жми «Поцеловать», иначе - «Отказать».<br/>
        Если поцелуй взаимен, то вы оба получите по одному поцелую себе на счет.
        Чем больше поцелуев - тем ты привлекательней.
      </p>
    </div>
  );
}

export default inject('store')( observer(PlayerKiss) );