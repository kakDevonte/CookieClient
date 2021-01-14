import './css/header-menu.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import {useHistory} from 'react-router-dom';

function HeaderMenu({store}) {
  const history = useHistory();

  const goShop = () => {
    store.app.keep(true);
    history.push({
      pathname: '/Shop/Profile/0'
    });
  };

  const shopButton = () => {
    if(store.os === 'iOS') return (<i className="shop-cookies hidden" />);
    return (<i onClick={ () => goShop() } className='shop-cookies' />);
  };

  return (
    <header className="header-menu">
      <i className="exit-game" onClick={ () => { history.goBack() } } />
      <section className="counter-cookie-count">
        <i />
        <span className="center-screen">{store.user.data.cookieCounter}</span>
        { shopButton() }
      </section>
      <section className="kiss-count">
        <i />
        <span>{store.user.data.kissCounter}</span>
      </section>
      <input type='button' className="change-table" onClick={ () => store.game.clickConfirmChangeTable() } />
      <input type='button' className="settings" />
      <section className="vk-apps-overlay">
        <input type='button' className="setup" />
        <div />
        <input type='button' className="exit-app" />
      </section>
    </header>
  );
}


export default inject('store')( observer(HeaderMenu) );