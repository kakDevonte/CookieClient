import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function PlayerTurn({store}) {
  const tutorial = store.tutorial;
  const bottle = document.querySelector('.cookie-selector');
  const style = {};

  if(bottle) { style.top = bottle.getBoundingClientRect().bottom + 40; }

  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.cookie-selector');
    tutorial.setAllowClickRotate(true);
  }, []);

  return (
    <div className="player-turn-step info center-X" style={ style }>
      <span className="info-header">Нажми на бутылочку</span>
      <p>
        Твой ход! Кликни на бутылочку!
      </p>
    </div>
  );
}

export default inject('store')( observer(PlayerTurn) );