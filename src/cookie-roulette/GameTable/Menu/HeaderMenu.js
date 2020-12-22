import './css/header-menu.css';

import React from 'react';
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

function HeaderMenu({store}){

  return (
    <header className="header-menu">
      <Link className="exit-game" to="/" />
      <section className="counter-cookie-count">
        <i />
        <span className="center-screen">{store.user.data.cookieCounter}</span>
        <Link to="/Shop/" className='shop-cookies' />
      </section>
      <section className="kiss-count">
        <i />
        <span>{store.user.data.kissCounter}</span>
      </section>
      <input type='button' className="change-table" onClick={ () => store.game.clickChangeTable() } />
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