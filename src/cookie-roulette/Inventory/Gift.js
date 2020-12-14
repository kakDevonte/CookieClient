import './css/gift.css';

import React from 'react';
import {inject, observer} from "mobx-react";


function Gift({store, gift, type}) {
  return (
      <article className="gift">
        <i />
        <div className={'info ' + type} />
      </article>
  );
}

export default inject('store')( observer(Gift) );