import './css/back-layer.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function BackLayer({store}){
  return (
    <article className={'roulette-back-layer' + store.app.backLayer} />
  );
}

export default inject('store')( observer(BackLayer) );