import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function PlayerTurn({store}) {
  const tutorial = store.tutorial;

  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.cookie-selector');
    tutorial.setAllowClickRotate(true);
  }, []);

  return (
    <div className="player-turn-step info center-X" >
      <span className="info-header">Нажми на бутылочку</span>
      <p>
        Нажимай скорей, чтобы начать свой раунд! Не заставляй ждать наших гостей.
      </p>
    </div>
  );
}

export default inject('store')( observer(PlayerTurn) );