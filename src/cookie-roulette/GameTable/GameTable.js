import '../../css/game-table.css';

import React from "react";
import Player from "./Player";
import KissModal from "./KissModal";
import HeaderMenu from "./HeaderMenu";
import CookieSelector from "./CookieSelector";
import Chat from "./Chat";

import { inject, observer } from "mobx-react";

const GameTable = ({store, users}) => {
  return (
      <section className="game">
        <article className="table">
          <HeaderMenu />
          <div className="wrap-players">
            <Player user={users[0]} index="7" />
            <Player user={users[1]} index="0" />
            <Player user={users[2]} index="1" />
          </div>
          <div className="wrap-players">
            <Player user={users[7]} index="6" />
            <div className="cookie-space" />
            <Player user={users[3]} index="2" />
          </div>
          <div className="wrap-players">
            <Player user={users[6]} index="5" />
            <Player user={users[5]} index="4" />
            <Player user={users[4]} index="3" />
          </div>
          <span className='table-id'>{store.user.table}</span>
          <CookieSelector />
        </article>
        <KissModal />
        <Chat />
      </section>
  );
};

export default inject('store')(observer(GameTable));
