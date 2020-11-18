import '../../css/header-menu.css';

import React from 'react';

class HeaderMenu extends React.Component{
  render() {
    return (
      <header className="header-menu">
        <input type='button' className="exit-game" />
        <section className="cookie-count">
          <i />
          <span className="center-screen">0</span>
          <input type="button" />
        </section>
        <section className="kiss-count">
          <i />
          <span>0</span>
        </section>
        <input type='button' className="change-table" />
        <input type='button' className="settings" />
        <section className="vk-apps-overlay">
          <input type='button' className="setup" />
          <div />
          <input type='button' className="exit-app" />
        </section>
      </header>
    );
  }
}

export default HeaderMenu;