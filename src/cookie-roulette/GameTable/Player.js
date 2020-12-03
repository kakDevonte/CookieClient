import '../../css/player.css';

import React, { useState } from "react";
import {inject, observer} from "mobx-react";
import KissResult from "./KissResult";
import {reaction} from "mobx";


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

  const kissResult = (index, key) => {
    if(store.game.kissResult){
      if(index === store.game.activeSeat || index === store.game.targetSeat){
        return ( <KissResult index={index} key={index + key} /> );
      }
    }
    return '';
  };

  const arr = [
    kissResult(index, 1),
    kissResult(index, 2),
    kissResult(index, 3)
  ];

  return (
    <article className={playerClass()} style={playerPhoto()}>
      <span className="turn-player">Крутит</span>
      { userName() }
      { userKissed() }
      <div className="wrap-kisses center-screen"> { arr.map(value => value) } </div>
    </article>
  );
}

function Kissed() {
  return(
    <span className='current-kiss'>{this.props.count}</span>
  );
}

export default inject('store')(observer(Player));