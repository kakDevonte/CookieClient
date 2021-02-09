import './css/tutorial.css';

import React from 'react';
import {inject, observer} from "mobx-react";

import TutorialRoom from "./TutorialRoom";
import Welcome from "./Steps/Welcome";
import GameStart from "./Steps/GameStart";
import ShadowLayer from "./ShadowLayer";
import PlayerTurnReady from "./Steps/PlayerTurnReady";
import PlayerTurn from "./Steps/PlayerTurn";
import PlayerTargetSelected from "./Steps/PlayerTargetSelected";
import PlayerKiss from "./Steps/PlayerKiss";

function Tutorial({store}) {
  return (
    <section className="tutorial-screen sbg-bottle">
      <ShadowLayer state={store.tutorial.shadowLayer} />
      <TutorialRoom />
      {
        {
          welcome: <Welcome />,
          gameStart: <GameStart />,
          playerTurnReady: <PlayerTurnReady />,
          playerTurn: <PlayerTurn />,
          rotate: <div />,
          playerTargetSelected: <PlayerTargetSelected />,
          playerKiss: <PlayerKiss />
        }[store.tutorial.step]
      }
    </section>
  );
}

export default inject('store')( observer(Tutorial) );