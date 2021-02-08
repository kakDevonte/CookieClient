import './css/give-gift.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function GiveGift({store}){
  const data = store.inventory.windowSendGift;
  let info;

  info = {
    window: '',
    giftName: 0,
    giftImage: {},
    giftCost: 0,
    userName: '',
    userImage: {}
  };

  if(data) {
    const gift = store.inventory.gifts[data.gid];
    const [user] = store.inventory.mode === 'global' ? store.table.findPlayer(data.to) : store.tutorial.findPlayer(data.to);

    info.giftName = gift.name;
    info.giftImage = { backgroundImage: `url("${gift.image}")` };
    info.giftCost = gift.cost;

    if(user) {
      info.window = ' opened';
      info.userName = user.name;
      info.userImage = { backgroundImage: `url("${user.photo}")`};
    }
  }

  const additionalInfo = () => {
    if(store.inventory.mode === 'local') {
      return <section className="send-gift-info" />;
    }
    if(data && data.buy) {
      return (
        <section className="send-gift-info">
          Этот подарок стоит <i /> {info.giftCost} шт.
        </section>
        );
    }
    return (
      <section className="send-gift-info">
        Это подарок из вашего инвентаря.
      </section>
    )
  };

  return (
    <article style={store.app.size.giftConfirm} className={ 'confirm-give-gift center-screen' + info.window }>
      <header>Дарим подарок</header>
      <section className="content">
        <article className="send-gift" style={ info.giftImage } >
          <span>{ info.giftName }</span>
        </article>
        <article className="space-for-animate">
          <div className="animate-gift-icon" />
        </article>
        <article className="send-player" style={ info.userImage }>
          <span>{ info.userName }</span>
        </article>
      </section>
      { additionalInfo() }
      <footer>
        <span onClick={ () => store.inventory.sendGift(true) }>Подарить</span>
        <span onClick={ () => store.inventory.sendGift(false) }>Отмена</span>
      </footer>
    </article>
  );
}

export default inject('store')( observer(GiveGift) );