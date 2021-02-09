import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function PlayerTurnReady({store}) {
  const tutorial = store.tutorial;

  useEffect(() => {
    tutorial.openShadowLayer();
    tutorial._accentItem('.player.p0');
  }, []);

  return (
    <div className="player-turn-ready-step info center-XY" >
      <p>
        Эй, гляди, у твоего портрета появилась плашка "Крутит".
        Ей помечается тот игрок, чья очередь сейчас крутить бутылочку.
      </p>
      <p>
        А раз плашка у тебя, то и крутить - тебе!
      </p>
      <div
        className="button-proceed-tutorial center-X"
        onClick={ () => store.tutorial.setStep('playerTurn') }>
        Понятно, давай крутить!
      </div>
    </div>
  );
}

export default inject('store')( observer(PlayerTurnReady) );