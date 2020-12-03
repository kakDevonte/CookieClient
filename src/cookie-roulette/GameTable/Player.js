import '../../css/player.css';

import React from "react";
import {inject, observer} from "mobx-react";


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

  const kissResult = () => {
    let style = {
      left: '35%',
      top: '35%'
    };

    if(store.game.kissResult) {

      if(store.game.activeSeat === index) {
        //setTimeout(() => animate(true), 100);

        return (<div className="round-kiss-result" style={style}/>);
      }

      if(store.game.targetSeat === index) {
        //setTimeout(() => animate(false), 100);

        return (<div className="round-kiss-result" style={style}/>);
      }
    }

    return '';
  };

  const animate = (active) => {
    const indexC = active ? store.game.activeSeat : store.game.targetSeat;
    const indexT = !active ? store.game.activeSeat : store.game.targetSeat;

    let current = document.querySelector(`.player.p${indexT} .round-kiss-result`);
    let target = document.querySelector(`.player.p${indexC}`);

    const pc = current.getBoundingClientRect();
    const pt = target.getBoundingClientRect();

    let left, top;

    left = pc.x - (pt.x + (pt.width * 0.65));
    top  = pc.y - (pt.y + (pt.height * 0.65));

    if(active) {
      if(pc.x > pt.x) left = left * -1;
      if(pc.y > pt.y) top = top * -1;
    }else{
      if(pc.x < pt.x) left = left * -1;
      if(pc.y < pt.y) top = top * -1;
    }

    current.setAttribute('style', `left: ${left}px; top: ${top}px;`);

    //setTimeout(() => {current.parentNode.removeChild(current)}, 3000);
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