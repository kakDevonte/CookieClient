import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function PlayerTargetSelected({store}) {
  const tutorial = store.tutorial;
  const player = store.tutorial._players.get(3);

  useEffect(() => {
    tutorial.openShadowLayer();
    tutorial._accentItem('.cookie-selector');
    tutorial._accentItem('.player.p3');
  }, []);

  return (
    <div className="player-target-selected-step info center-X" >
      <p>
        Смотри, бутылочка остановиалсь и указала на другого случайного игрока.
        Тот, на кого она указывает, будет подсвечен оранжевой рамкой.
      </p>
      <p>Это {player.fullName}! Неплохо, да?</p>
      <div
        className="button-proceed-tutorial center-X"
        onClick={ () => store.tutorial.setStep('playerKiss') }>
        Понятно, хочу целоваться!
      </div>
    </div>
  );
}

export default inject('store')( observer(PlayerTargetSelected) );