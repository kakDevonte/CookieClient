import './css/inventory.css';

import React from 'react';
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import Gifts from "./Gifts";


function Inventory({store}) {
  return (
    <article className={ 'inventory' + store.inventory.state}>
      <header>
        <div onClick={ () => store.inventory.clickPersonalMessage() }>
          Личное сообщение
        </div>
        <Link to="/Profile" onClick={ () => store.app.keep(true) }>Профиль<br/>{store.inventory.name}</Link>
      </header>
      <div className="gifts-list custom-scroll">
        <Gifts gifts={ store.inventory.list }/>
      </div>
    </article>
  );
}

export default inject('store')( observer(Inventory) );