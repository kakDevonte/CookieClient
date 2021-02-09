import './css/tutorial.css';

import React from 'react';
import {inject, observer} from "mobx-react";

import TutorialRoom from "./TutorialRoom";
import Welcome from "./Steps/Welcome";
import GameStart from "./Steps/GameStart";

function Tutorial({store}) {
  return (
    <section className="tutorial-screen sbg-bottle">

      <TutorialRoom />
      {
        {
          welcome: <Welcome />,
          gameStart: <GameStart />
        }[store.tutorial.step]
      }
    </section>
  );
}

export default inject('store')( observer(Tutorial) );