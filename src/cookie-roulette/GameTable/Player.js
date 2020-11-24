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

  const _userName = () => {
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

  const _userKissed = () => {
    if(player && player.kissed.length) {
      return <Kissed count={player.kissed.length} />
    } else {
      return '';
    }
  };

  const _playerClass = () => {
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

  const _playerPhoto = () => {
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
    <article className={_playerClass()} style={_playerPhoto()}>
      <span className="turn-player">Крутит</span>
      {_userName()}
      {_userKissed()}
    </article>
  );
}

function Kissed() {
  return(
    <span className='current-kiss'>{this.props.count}</span>
  );
}

export default inject('store')(observer(Player));