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
    if(store.inventory.mode === 'local') {
      return <div className={'info ' + type} />;
    }
    return  <div className={'info ' + type} ><i /><span>{gift.cost}</span></div>
  };

  const image = () => {
    return {
      backgroundImage: `url('${gift.image}')`
    }
  };

  return (
      <article className="gift" style={store.app.size.gift} onClick={ () => store.inventory.openConfirmSendGift(type, id) }>
          <i style={ image() } />
          { info() }
      </article>
  );
}

export default inject('store')( observer(Gift) );