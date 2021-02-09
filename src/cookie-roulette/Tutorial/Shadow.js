import React from 'react';
import {inject, observer} from "mobx-react";

function Shadow({store}){
  return (
    <article className={'shadow-layer' + store.tutorial.shadow} />
  );
}

export default inject('store')( observer(Shadow) );