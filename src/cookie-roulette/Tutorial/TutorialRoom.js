import '../GameTable/Menu/css/header-menu.css';
import '../GameTable/css/game-table.css';
import '../GameTable/css/wait-players.css';

import React, {useState} from 'react';
import {inject, observer} from "mobx-react";
import {useHistory} from 'react-router-dom';

import BackLayer from "../GameTable/BackLayer";
import WaitMorePlayers from "../GameTable/WaitMorePlayers";
import CookieSelector from "../GameTable/CookieSelector";

import Player from "./Player/Player";

import common from "../../config/common";


function TutorialRoom({store}) {
  const history = useHistory();
  const player = store.tutorial.getPlayer;

  return (
    <section className="cookie-roulette-game">
      <BackLayer />
      <article className="roulette-table sbg-bottle" style={store.app.size.table}>
        <header className="header-menu">
          <i className="exit-game" onClick={ () => { history.goBack() } } />
          <section className="counter-cookie-count">
            <i />
            <span className="center-screen">{store.user.data.cookieCounter}</span>
            <i className="shop-cookies hidden" />
          </section>
          <KissCounter kisses={store.user.data.kissCounter} />
          <ChangeButton store={store} remain={5} />
          <div className="rating-button" onClick={ () => store.rating.toggleRatingPanel() }>
            <i className="center-XY" />
          </div>
          <section className="vk-apps-overlay">
            <input type='button' className="setup" />
            <div />
            <input type='button' className="exit-app" />
          </section>
        </header>
        <div className="wrap-players" onClick={ (event) => store.tutorial.closeInventory(event) }>
          <Player player={player(7)} index={7} />
          <Player player={player(0)} index={0} />
          <Player player={player(1)} index={1} />
        </div>
        <div className="wrap-players" onClick={ (event) => store.tutorial.closeInventory(event) }>
          <Player player={player(6)} index={6} />
          <div className="cookie-space">
            <WaitMorePlayers state={store.tutorial.gameState} />
            <CookieSelector
              state={store.tutorial.gameState}
              allow={store.tutorial.allowClickRotate}
              rotate={store.tutorial.rotateCookie}
              click={ () => store.tutorial.clickRotateCookie() }
            />
          </div>
          <Player player={player(2)} index={2} />
        </div>
        <div className="wrap-players" onClick={ (event) => store.tutorial.closeInventory(event) }>
          <Player player={player(5)} index={5} />
          <Player player={player(4)} index={4} />
          <Player player={player(3)} index={3} />
        </div>
      </article>
      <article className="utility-wrapper" style={store.app.size.utilities}>

      </article>
    </section>
  );
}

function KissCounter({kisses}) {
  const [classTooltip, setClassTooltip] = useState('tooltip center-X');

  const showTooltip = () => {
    setClassTooltip('tooltip center-X opened');

    setTimeout(() => {
      setClassTooltip('tooltip center-X');
    }, 2000);
  };

  return (
    <section className="kiss-count" onClick={ () => showTooltip() }>
      <i />
      <span>{kisses}</span>
      <div className={ classTooltip }>
        Вас поцеловали: { common.wordEnding(kisses, ['раз', 'раза', 'раз']) }
        <div className="arrow-up center-X" />
      </div>
    </section>
  );
}

function ChangeButton({store, remain}) {
  const [classTooltip, setClassTooltip] = useState('tooltip center-X');

  const showTooltip = () => {
    setClassTooltip('tooltip center-X opened');

    setTimeout(() => {
      setClassTooltip('tooltip center-X');
    }, 2000);
  };

  if(remain) {
    return (
      <div className="change-table" onClick={ () => showTooltip() }>
        <span className="center-screen">{ remain }</span>
        <div className={classTooltip}>
          До смены стола: { common.wordEnding(remain, ['ход', 'хода', 'ходов']) }
          <div className="arrow-up center-X" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="change-table active">
        <i className="center-screen" />
      </div>
    );
  }
}

export default inject('store')( observer(TutorialRoom) );