import './css/gift.css';

import React from 'react';
import {inject, observer} from "mobx-react";


function Gift({store, data, type}) {
  const id = data.id !== undefined ? data.id : data;
  let gift = store.inventory.gifts[id];

  if(!gift) gift = store.inventory.emptyGift;

  const info = () => {
    if(type === "owner") {
      return <div className={'info ' + type} >{data.count} шт</div>;
    }
    return  <div className={'info ' + type} >{gift.cost}</div>
  };

  const image = () => {
    return {
      backgroundImage: `url('${gift.image}')`
    }
  };

  return (
      <article className="gift-container">
        <div className="gift" onClick={ () => store.inventory.sendGift(type, id) }>
          <i style={ image() } />
          { info() }
        </div>
      </article>
  );
}

export default inject('store')( observer(Gift) );