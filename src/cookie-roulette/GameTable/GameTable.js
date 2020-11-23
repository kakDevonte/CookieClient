import '../../css/game-table.css';

import React from "react";
import Player from "./Player";
import KissModal from "./KissModal";
import HeaderMenu from "./HeaderMenu";
import CookieSelector from "./CookieSelector";
import Chat from "./Chat";

import { inject, observer } from "mobx-react";

const GameTable = ({store, game}) => {

  return (
      <section className="game">
        <article className="table">
          <HeaderMenu />
          <div className="wrap-players">
            <Player user={game.player(7)} index="7" />
            <Player user={game.player(0)} index="0" />
            <Player user={game.player(1)} index="1" />
          </div>
          <div className="wrap-players">
            <Player user={game.player(6)} index="6" />
            <div className="cookie-space" />
            <Player user={game.player(2)} index="2" />
          </div>
          <div className="wrap-players">
            <Player user={game.player(5)} index="5" />
            <Player user={game.player(4)} index="4" />
            <Player user={game.player(3)} index="3" />
          </div>
          <span className='table-id'>{store.game.tid}</span>
          <CookieSelector />
        </article>
        <KissModal />
        <Chat />
      </section>
  );
};

export default inject('store')(observer(GameTable));
