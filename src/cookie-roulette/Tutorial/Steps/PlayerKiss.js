import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function PlayerKiss({store}) {
  const tutorial = store.tutorial;

  useEffect(() => {
    tutorial._disAccentAll();
    tutorial.updateKissData();
  }, []);

  return (
    <div className="player-kiss-step info center-X" >
      <span className="info-header">Нажми «Поцеловать»</span>
      <p>
        Это окно поцелуя, оно будет появляться всякий раз, когда вы крутите бутылочку
        или бутылочка указал на вас, когда ее куртил другой игрок.
      </p>
      <p>
        Поцелуй - это знак внивмания, если вам симпатичен другой игрок,
        смело жмите "поцеловать", иначе "отказывайте". Если поцелуй взаимен,
        то вы получите по одному поцелую себе на счет.<br/>
        Чем больше поцелуев - тем вы привлекательней.
      </p>
    </div>
  );
}

export default inject('store')( observer(PlayerKiss) );