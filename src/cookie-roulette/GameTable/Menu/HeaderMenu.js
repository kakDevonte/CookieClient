import './css/header-menu.css';

import React, {useState} from 'react';
import {inject, observer} from "mobx-react";
import {useHistory} from 'react-router-dom';
import common from "../../../config/common";

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
      <KissCounter kisses={store.user.data.kissCounter} />
      <ChangeButton store={store} remain={store.game.turnsBeforeChangeTable} />
      <input type='button' className="settings" />
      <section className="vk-apps-overlay">
        <input type='button' className="setup" />
        <div />
        <input type='button' className="exit-app" />
      </section>
    </header>
  );
}

function KissCounter({kisses}) {
  const [classTooltip, setClassTooltip] = useState('tooltip center-X');

  const showTooltip = () => {
    setClassTooltip('tooltip center-X opened');

    setTimeout(() => {
      setClassTooltip('tooltip center-X');
    }, 2000);
  };

  return (
    <section className="kiss-count" onClick={ () => showTooltip() }>
      <i />
      <span>{kisses}</span>
      <div className={ classTooltip }>
        Вас поцеловали: { common.wordEnding(kisses, ['раз', 'раза', 'раз']) }
        <div className="arrow-up center-X" />
      </div>
    </section>
  );
}

function ChangeButton({store, remain}) {
  const [classTooltip, setClassTooltip] = useState('tooltip center-X');

  const showTooltip = () => {
    setClassTooltip('tooltip center-X opened');

    setTimeout(() => {
      setClassTooltip('tooltip center-X');
    }, 2000);
  };

  if(remain) {
    return (
      <div className="change-table" onClick={ () => showTooltip() }>
        <span className="center-screen">{ remain }</span>
        <div className={classTooltip}>
          До мены стола: { common.wordEnding(remain, ['ход', 'хода', 'ходов']) }
          <div className="arrow-up center-X" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="change-table active" onClick={ () => store.game.clickConfirmChangeTable() }>
        <i className="center-screen" />
      </div>
    );
  }
}


export default inject('store')( observer(HeaderMenu) );