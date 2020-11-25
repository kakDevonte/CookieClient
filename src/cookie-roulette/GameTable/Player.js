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
        if(store.game.currentTurn === index) {
          className.push('turn');
        }
      },

      target = () => {
        if(store.game.currentTurn === null) return;
        if(store.game.currentTurn === store.game.currentTarget) return;

        if(store.game.currentTarget === index) {
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

  return (
    <article className={playerClass()} style={playerPhoto()}>
      <span className="turn-player">Крутит</span>
      {userName()}
      {userKissed()}
    </article>
  );
}

function Kissed() {
  return(
    <span className='current-kiss'>{this.props.count}</span>
  );
}

export default inject('store')(observer(Player));