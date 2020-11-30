import '../../css/player.css';

import React from "react";
import {inject, observer} from "mobx-react";


function Player ({store, player, index}) {
  // function foo(){
  //   if(player) {
  //     console.log('Render Player!', player.name, player.id);
  //   }else{
  //     console.log('Render Empty Seat!');
  //   }
  // }
  //
  // foo();

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
        // if(player){
        //   console.log("Turn", player.name, store.game.currentTurn);
        // }
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
        backgroundSize: 'cover'
      }
    } else {
      return {};
    }
  };

  const kissResult = () => {
    let style = {};

    console.log("test", store.game.kissResult);

    if(store.game.kissResult) {

      if(store.game.activeSeat === index) {
        setTimeout(() => animate(true), 100);

        return (<div className="round-kiss-result" style={style}/>);
      }

      if(store.game.targetSeat === index) {
        setTimeout(() => animate(false), 100);

        return (<div className="round-kiss-result" style={style}/>);
      }
    }

    return '';
  };

  const animate = (active) => {
    const indexC = active ? store.game.activeSeat : store.game.targetSeat;
    const indexT = !active ? store.game.activeSeat : store.game.targetSeat;

    let current = document.querySelector(`.player.p${indexT} .round-kiss-result`);
    let target = document.querySelector(`.player.p${indexC} .round-kiss-result`);

    const position = target.getBoundingClientRect();
    const pos = current.getBoundingClientRect();

    console.log(position);

    current.setAttribute('style', `left: ${pos.left - position.left}px; top: ${pos.top - position.top}px;`);
  };

  return (
    <article className={playerClass()} style={playerPhoto()}>
      <span className="turn-player">Крутит</span>
      {userName()}
      {userKissed()}
      {kissResult()}
    </article>
  );
}

function Kissed() {
  return(
    <span className='current-kiss'>{this.props.count}</span>
  );
}

export default inject('store')(observer(Player));