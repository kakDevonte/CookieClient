import './css/inventory.css';

import React from 'react';
import {useHistory} from "react-router-dom";
import {inject, observer} from "mobx-react";
import Gifts from "./Gifts";


function Inventory({store}) {
  const history = useHistory();
  const id = () => {
    if(store.inventory._player) {
      if(store.inventory._player.template) {
        return store.inventory._player.template;
      } else {
        return store.inventory._player.id;
      }
    } else {
      return '1';
    }
  };

  const toProfile = {
    pathname: "/Profile",
    propsSearch: {
      id: id(),
      myProfile: false,
    }
  };

  const openProfile = () => {
    store.app.keep(true);
    history.push(toProfile);
  };

  return (
    <article className={ 'inventory' + store.inventory.state}>
      <header>
        <div className="personal-message-button" onClick={ () => store.inventory.clickPersonalMessage() }>
          Личное сообщение
        </div>
        <div className="open-profile-button" onClick={ () => openProfile() }>Профиль<br/>{store.inventory.name}</div>
        <div className="close-inventory-button"
             onClick={ () => store.inventory.clickToggleInventory(null, {target:{className: 'wrap-players'}}) }
        />
      </header>
      <div className="gifts-list custom-scroll">
        <Gifts gifts={ store.inventory.list }/>
      </div>
    </article>
  );
}

export default inject('store')( observer(Inventory) );