import './css/gifted.css';

import React, {useEffect, useRef} from 'react';
import {inject, observer} from "mobx-react";

function Gifted({store, gifts, index}) {
  let elements = useRef([]);

  const showTooltip = (n) => {
    const tooltip = elements.current[n - 1].querySelector('.tooltip-from');

    tooltip.classList.toggle('opened');

    setTimeout( () => {
      tooltip.classList.toggle('opened');
    }, 2000);
  };

  useEffect(() => {
    const nodes = document.querySelectorAll(`.player.p${index} .receive-gift article`);
    const count = nodes.length;
    let timeout;

    elements.current = nodes;

    const show = (index, count, restart) => {
      if(count > 1) {
        nodes[index].setAttribute('class', 'hided');
        index++;
        if(index === count) index = 0;
        nodes[index].setAttribute('class', 'showed');
      } else {
        if(nodes[0].className !== 'show') {
          nodes[0].setAttribute('class', 'show');
        }
      }

      if(restart) timeout = setTimeout(() => show(index, count, restart), 7500);
    };

    if(count > 1) {
      if(timeout) clearTimeout(timeout);
      show(count - 1, count, true);
    } else {
      show(count - 1, count, false);
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