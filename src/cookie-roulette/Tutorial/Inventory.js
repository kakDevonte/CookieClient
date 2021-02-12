import '../Inventory/css/inventory.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import Gifts from "../Inventory/Gifts";


function Inventory({store}) {

  const openProfile = () => {

  };

  return (
    <article className={ 'inventory' + store.inventory.state}>
      <header>
        <div className="personal-message-button" onClick={ () => store.tutorial.clickPersonalMessage() }>
          Личное сообщение
        </div>
        <div className="open-profile-button" onClick={ () => openProfile() }>Профиль<br/>{store.inventory.name}</div>
        <div className="close-inventory-button"
             onClick={ () => store.tutorial.clickToggleInventory(null, {target:{className: 'wrap-players'}}) }
        />
      </header>
      <div className="gifts-list custom-scroll">
        <Gifts gifts={ store.inventory.list }/>
      </div>
    </article>
  );
}

export default inject('store')( observer(Inventory) );