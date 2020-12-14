import './css/inventory.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import Gifts from "./Gifts";

//store.inventory.state

const gifts = {
  '1': {
    id: 1,
    name: "Роза",
    hit: 0,
    cost: 2,
    grade: 1,
    image: '',
  },
  '2': {
    id: 2,
    name: "Виски",
    hit: 1,
    cost: 2,
    grade: 1,
    image: '',
  }
};

const list = new Map();
const owner = new Map();
const men = new Map();
const woman = new Map();

owner.set('2', gifts['2']).set('1', gifts['1']);
men.set('2', gifts['2']);
woman.set('1', gifts['1']);

list
  .set('owner', owner)
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
      <div className="gifts-groups">
        <Gifts gifts={ list }/>
      </div>
    </article>
  );
}

export default inject('store')( observer(Inventory) );