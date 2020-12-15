import './css/inventory.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import Gifts from "./Gifts";

//store.inventory.state

const gifts = {

};

const list = new Map();
const owner = {name: 'Инвентарь', gifts: new Map()};
const men = {name: 'Мужчинам', gifts: new Map()};
const woman = {name: 'Женщинам', gifts: new Map()};

owner.gifts.set('2', gifts['2']).set('1', gifts['1']);
men.gifts.set('2', gifts['2']);
woman.gifts.set('1', gifts['1']);



list
  //.set('owner', owner)
  .set('men', men)
  .set('woman', woman);

function Inventory({store}) {
  return (
    <article className={ 'inventory opened' }>
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