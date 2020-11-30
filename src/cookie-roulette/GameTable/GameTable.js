import '../../css/game-table.css';

import React from "react";
import Player from "./Player";
import KissModal from "./KissModal";
import HeaderMenu from "./HeaderMenu";
import CookieSelector from "./CookieSelector";
import Chat from "./Chat";
import TurnCountTooltip from "./TurnsCountTooltip";

import { inject, observer } from "mobx-react";

const GameTable = ({store}) => {
  const player = store.table.getPlayer;

  return (
      <section className="game">
        <article className="table">
          <HeaderMenu />
          <div className="wrap-players">
            <Player player={player(7)} index={7} />
            <Player player={player(0)} index={0} />
            <Player player={player(1)} index={1} />
          </div>
          <div className="wrap-players">
            <Player player={player(6)} index={6} />
            <div className="cookie-space">
              <CookieSelector />
              <TurnCountTooltip/>
            </div>
            <Player player={player(2)} index={2} />
          </div>
          <div className="wrap-players">
            <Player player={player(5)} index={5} />
            <Player player={player(4)} index={4} />
            <Player player={player(3)} index={3} />
          </div>
          <span className='table-id'>{store.table.id}</span>
        </article>
        <KissModal />
        <Chat />
      </section>
  );
};

export default inject('store')(observer(GameTable));
