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
import DeclineKiss from "./Steps/DeclineKiss";
import AcceptGift from "./Steps/AcceptGift";
import OpenInventory from "./Steps/OpenInventory";
import GiveGift from "./Steps/GiveGift";
import GiftSelected from "./Steps/GiftSelected";
import SuccessGift from "./Steps/SuccessGift";
import OpenTalk from "./Steps/OpenTalk";
import WriteMessage from "./Steps/WriteMessage";
import EndTutorial from "./Steps/EndTutorial";
import PersonalMessage from "./Steps/PersonalMessage";

function Tutorial({store}) {
  const tutorial = store.tutorial;

  return (
    <section className="tutorial-screen sbg-bottle">
      <ShadowLayer state={store.tutorial.shadowLayer} />
      <TutorialRoom />
      {
        {
          welcome: <Welcome tutorial={tutorial} />,
          gameStart: <GameStart tutorial={tutorial} />,
          playerTurnReady: <PlayerTurnReady tutorial={tutorial} />,
          playerTurn: <PlayerTurn tutorial={tutorial} />,
          rotate: <div className="tutorial-empty-step" />,
          playerTargetSelected: <PlayerTargetSelected tutorial={tutorial} />,
          playerKiss: <PlayerKiss tutorial={tutorial} />,
          declineKiss: <DeclineKiss tutorial={tutorial} />,
          acceptKiss: <div className="tutorial-empty-step" />,
          acceptGift: <AcceptGift tutorial={tutorial} />,
          openInventory: <OpenInventory tutorial={tutorial} />,
          giveGift: <GiveGift tutorial={tutorial} />,
          giftSelected: <GiftSelected tutorial={tutorial} />,
          successGift: <SuccessGift tutorial={tutorial} store={store} />,
          personalMessage: <PersonalMessage tutorial={tutorial} />,
          openTalk: <OpenTalk tutorial={tutorial} />,
          readMessage: <div className="tutorial-empty-step" />,
          writeMessage: <WriteMessage tutorial={tutorial} />,
          endTutorial: <EndTutorial tutorial={tutorial} />
        }[store.tutorial.step]
      }
    </section>
  );
}

export default inject('store')( observer(Tutorial) );