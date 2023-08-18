import "./css/header-menu.scss";

import React from "react";
import { inject, observer } from "mobx-react";

import KissCounter from "./KissCounter";
import ChangeButton from "./ChangeButton";
import { useHistory } from "react-router-dom";
import qs from "querystring";

function HeaderMenu({ store }) {
  const toProfile = () => {
    store.history.push("/profile");
    store.profile.emitProfileData(store.user.id, store.user.id);
    store.profile.toggleMyProfile(true);
    //store.profile.toggleProfile();
  };

  const shopButton = () => {
    if (store.os === "iOS") return <i className="shop-cookies hidden" />;
    return (
      <i onClick={() => store.history.push("/shop")} className="shop-cookies" />
    ); //() => goShop() //store.shop.toggleShopPanel()
  };

  return (
    <header className="header-menu">
      <i className="profile-btn" onClick={toProfile} />
      <section className="counter-cookie-count">
        <i />
        <span className="center-screen counter-cookie-count-span">
          {store.user._money}
        </span>
        {shopButton()}
      </section>
      <KissCounter kisses={store.user.data.kissCounter} />
      <ChangeButton
        remain={store.game.turnsBeforeChangeTable}
        click={() => store.game.clickConfirmChangeTable()}
      />
      <div
        className="rating-button"
        onClick={() => {
          store.history.push("/rating");
          store.rating.toggleRatingPanel();
        }}
      >
        <i className="center-XY" />
      </div>
      {/*<input type='button' className="settings" />*/}
      <section className="vk-apps-overlay">
        <input type="button" className="setup" />
        <div />
        <input type="button" className="exit-app" />
      </section>
    </header>
  );
}

export default inject("store")(observer(HeaderMenu));
