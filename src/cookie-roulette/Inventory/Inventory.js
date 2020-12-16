import './css/inventory.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import Gifts from "./Gifts";


function Inventory({store}) {
  return (
    <article className={ 'inventory' + store.inventory.state }>
      <header>
        <div onClick={ () => store.inventory.clickPersonalMessage() }>
          Личное сообщение
        </div>
        <div className="" onClick={ () => {} }>
          Профиль<br/>{store.inventory.name}
        </div>
      </header>
      <div className="gifts-list custom-scroll">
        <Gifts gifts={ store.inventory.list }/>
      </div>
    </article>
  );
}

export default inject('store')( observer(Inventory) );