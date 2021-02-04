import '../GameTable/Menu/css/header-menu.css';
import '../GameTable/css/game-table.css';
import '../GameTable/css/wait-players.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import {useHistory} from 'react-router-dom';

import BackLayer from "../GameTable/BackLayer";
import KissCounter from "../GameTable/Menu/KissCounter";
import ChangeButton from "../GameTable/Menu/ChangeButton";
import WaitMorePlayers from "../GameTable/WaitMorePlayers";
import AnimationCookie from "../GameTable/AnimationCookie";
import CookieSelector from "../GameTable/CookieSelector";

import Player from "./Player/Player";
import Chat from "../Chat/Chat";


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
          <KissCounter kisses={ store.user.data.kissCounter } />
          <ChangeButton remain={5} click={ () => {} } />
          <div className="rating-button" onClick={ () => {} }>
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
            <AnimationCookie
              seat={store.tutorial.targetSelector}
              oldSeat={store.tutorial.previousTargetSelector}
            />
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
        <Chat />
      </article>
    </section>
  );
}

export default inject('store')( observer(TutorialRoom) );