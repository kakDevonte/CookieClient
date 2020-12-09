import './css/inventory.css';

import React from 'react';
import {inject, observer} from "mobx-react";

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
      <div className="gifts" />
    </article>
  );
}

export default inject('store')( observer(Inventory) );