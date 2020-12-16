import './css/gifted.css';

import React, {useState} from 'react';
import {inject, observer} from "mobx-react";

function Gifted({store, gifts}) {
  const
    item = gifts[gifts.length - 1],
    gift = store.inventory.gifts[item.id];

  const [visible, setVisible] = useState('');

  const showTooltip = () => {
    setVisible(' opened');

    setTimeout( () => {
      setVisible('');
    }, 2000);
  };

  return (
    <div className="receive-gift" onClick={ () => showTooltip() }>
      <i style={ {backgroundImage: `url('${gift.image}')`} } />
      <div className={"tooltip-from" + visible}>
        <i style={ {backgroundImage: `url('${item.photo}')`} } /> { item.name }
      </div>
    </div>
  );
}

export default inject('store')( observer(Gifted) );