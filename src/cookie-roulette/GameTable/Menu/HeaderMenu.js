import './css/header-menu.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function HeaderMenu({store}){

  return (
    <header className="header-menu">
      <input type='button' className="exit-game" />
      <section className="cookie-count">
        <i />
        <span className="center-screen">{store.user.data.cookieCounter}</span>
        <input type="button" />
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