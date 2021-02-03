import './css/player.css';

import React from "react";
import {inject, observer} from "mobx-react";

import KissResult from "./KissResult";
import Kissed from "./Kissed";
import Gifted from "./Gifted";
import SendingGift from "./SendingGift";


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

      if(last) {
        return <Gifted gifts={player.gifted} index={index} />
      }
    }
    return <div className="receive-gift" style={{visibility: 'hidden'}} />;
  };

  const playerClass = () => {
    const
      className = ['player'],

      playerIndex = () => {
        className.push('p' + index);
      },

      turn = () => {
        if(store.tutorial.activeSeat === index) {
          className.push('turn');
        }
      },

      target = () => {
        if(store.tutorial.targetSeat === null) return;
        if(store.tutorial.targetSeat === store.tutorial.activeSeat) return;

        if(store.tutorial.targetSeat === index) {
          className.push('target-kiss');
        }
      },

      selected = () => {
        if(store.tutorial.inventoryState === ' opened' && store.tutorial.inventoryCurrent === index) {
          className.push('selected');
        }
      };

    playerIndex();
    turn();
    target();
    selected();

    return className.join(' ');
  };

  const playerPhoto = () => {
    if(player) {
      return {
        backgroundImage: `url("${player.photo}")`,
        backgroundSize: '140%',
      }
    } else {
      return {};
    }
  };

  const kissResult = (index) => {
    if(store.tutorial.kissResult){
      if(index === store.tutorial.activeSeat || index === store.tutorial.targetSeat){
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

  const sendingGift = () => {
    const gifts = [];

    store.tutorial.giftReceived.forEach((gift, n) => {
      if(gift && index === gift.active[1]) {
        gifts.push(<SendingGift data={gift} key={n + '' + index} />);
      }
    });

    return gifts;
  };

  //console.log('reRender', index);

  return (
    <article
      data-index={index}
      className={playerClass()}
      style={playerPhoto()}
    >
      <span className="turn-player">Крутит</span>
      { userName() }
      { userKissed() }
      { kissResult(index) }
      { sendingGift() }
      { userGifted() }
    </article>
  );
}

export default inject('store')(observer(Player));