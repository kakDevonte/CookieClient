import './css/gifted.css';

import React, {useEffect, useRef} from 'react';
import {inject, observer} from "mobx-react";

function Gifted({store, gifts, index}) {
  let elements = useRef([]);

  const showTooltip = (n) => {
    const tooltip = elements.current[n - 1].querySelector('.tooltip-from');

    if(tooltip) tooltip.classList.add('opened');

    setTimeout( () => {
      if(tooltip) tooltip.classList.remove('opened');
    }, 2000);
  };

  useEffect(() => {
    const nodes = document.querySelectorAll(`.player.p${index} .receive-gift article`);
    const count = nodes.length;
    let timeout, length = nodes.length;

    elements.current = nodes;

    while(length--) {
      if(length === 0) {
        nodes[length].setAttribute('class', 'show');
      } else {
        if(nodes[length]) nodes[length].setAttribute('class', '');
      }
    }

    const show = (index, count) => {
        if(nodes[index]) nodes[index].setAttribute('class', 'hided');

        index++;
        if(index === count) index = 0;

        if(nodes[index]) nodes[index].setAttribute('class', 'showed');

        timeout = setTimeout(() => show(index, count), 7500);
    };

    if(count > 1) {
      if(timeout) clearTimeout(timeout);
      timeout = setTimeout(() => show(0, count), 7500);
    }

    return () => {
      if(timeout) clearTimeout(timeout);
    }
  });

  const _gift = (index) => {
    let item, gift;

    item = gifts[gifts.length - index];
    if(!item) return '';

    gift = store.inventory.gifts[item.id];

    return (
      <article className='hided' onClick={ () => showTooltip(index) }>
        <i style={ {backgroundImage: `url('${gift.image}')`} } />
        <div className="tooltip-from">
          <i style={ {backgroundImage: `url('${item.photo}')`} } /> { item.name }
        </div>
      </article>
    );
  };

  return (
    <div className="receive-gift">
      { _gift(1) }
      { _gift(2) }
      { _gift(3) }
    </div>
  );
}

export default inject('store')( observer(Gifted) );