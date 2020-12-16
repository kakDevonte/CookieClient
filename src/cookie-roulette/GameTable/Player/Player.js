import './css/player.css';

import React from "react";
import {inject, observer} from "mobx-react";

import KissResult from "./KissResult";
import Kissed from "./Kissed";
import Gifted from "./Gifted";


function Player ({store, player, index}) {

  const userName = () => {
    if(player) {
      if(player.itsMe){
        return (<span className="player-name">Вы</span>);
      } else {
        return <span className="player-name">{player.name}</span>
      }
    } else {
      return '';
    }
  };

  const userKissed = () => {
    if(player && player.kissed.length) {
      return <Kissed count={player.kissed.length} />
    } else {
      return '';
    }
  };

  const userGifted = () => {
    if(player) {
      const last = player.gifted.length;

      console.log(player.gifted);

      if(last) {
        return <Gifted gifts={player.gifted} />
      }
    }
    return '';
  };

  const playerClass = () => {
    const
      className = ['player'],

      playerIndex = () => {
        className.push('p' + index);
      },

      turn = () => {
        if(store.game.activeSeat === index) {
          className.push('turn');
        }
      },

      target = () => {
        if(store.game.targetSeat === null) return;
        if(store.game.targetSeat === store.game.activeSeat) return;

        if(store.game.targetSeat === index) {
          className.push('target-kiss');
        }
      };

    playerIndex();
    turn();
    target();

    return className.join(' ');
  };

  const playerPhoto = () => {
    if(player) {
      return {
        backgroundImage: `url("${player.photo}")`,
        backgroundSize: '150%',
        backgroundPosition: 'center center'
      }
    } else {
      return {};
    }
  };

  const kissResult = (index) => {
    if(store.game.kissResult){
      if(index === store.game.activeSeat || index === store.game.targetSeat){
        return(
          <div className="wrap-kisses center-screen">
            <KissResult index={index} delay={0} />
            <KissResult index={index} delay={500} />
            <KissResult index={index} delay={1000} />
          </div>
          );
      }
    }
    return '';
  };

  return (
    <article
      onClick={ (event) => store.inventory.clickToggleInventory(index, event) }
      className={playerClass()}
      style={playerPhoto()}
    >
      <span className="turn-player">Крутит</span>
      { userName() }
      { userKissed() }
      { kissResult(index) }
      { userGifted() }
    </article>
  );
}

export default inject('store')(observer(Player));