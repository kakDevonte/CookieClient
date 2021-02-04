import './css/game-table.css';

import React from "react";
import { inject, observer } from "mobx-react";

import BackLayer from "./BackLayer";

import HeaderMenu from "./Menu/HeaderMenu";
import Player from "./Player/Player";
import AnimationCookie from "./AnimationCookie";
import TurnCountTooltip from "./TurnsCountTooltip";
import CookieSelector from "./CookieSelector";
import YourTurnTooltip from "./YourTurnTooltip";
import WaitMorePlayers from "./WaitMorePlayers";

import KissModal from "./Modal/KissModal";
import ServerFail from "./Modal/ServerFail";
import ChangeTable from "./Modal/changeTable";
import GiveGift from "./Modal/GiveGift";

import Chat from "../Chat/Chat";
import Inventory from "../Inventory/Inventory";
import RatingPanel from "../Rating/Rating";

const GameTable = ({store}) => {
  const player = store.table.getPlayer;

  const app = store.app;
  const game = store.game;
  const inventory = store.inventory;

  const tid = () => {
    //document.title = store.table.id;
    return store.table.id;
  };

  return (
      <section className="cookie-roulette-game">
        <BackLayer />
        <article className="roulette-table sbg-bottle" style={app.size.table}>
          <HeaderMenu />
          <div className="wrap-players" onClick={ (event) => inventory.clickToggleInventory(null, event) }>
            <Player player={player(7)} index={7} />
            <Player player={player(0)} index={0} />
            <Player player={player(1)} index={1} />
          </div>
          <div className="wrap-players" onClick={ (event) => inventory.clickToggleInventory(null, event) }>
            <Player player={player(6)} index={6} />
            <div className="cookie-space">
              <WaitMorePlayers state={game.state} />
              <AnimationCookie
                seat={game.targetSelector}
                oldSeat={game.previousTargetSelector}
              />
              <CookieSelector
                state={game.state}
                allow={game.allowClickRotate}
                rotate={game.rotateCookie}
                click={ () => game.clickRotateCookie() }
              />
              <TurnCountTooltip/>
              <YourTurnTooltip />
            </div>
            <Player player={player(2)} index={2} />
          </div>
          <div className="wrap-players" onClick={ (event) => inventory.clickToggleInventory(null, event) }>
            <Player player={player(5)} index={5} />
            <Player player={player(4)} index={4} />
            <Player player={player(3)} index={3} />
          </div>
          <span className='table-id'>{ tid() }</span>
          <ChangeTable />
          <KissModal />
          <ServerFail />
        </article>
        <article className="utility-wrapper" style={app.size.utilities}>
          <Chat />
          <Inventory search={app.search} />
        </article>
        <GiveGift />
        <RatingPanel />
      </section>
  );
};

export default inject('store')(observer(GameTable));
