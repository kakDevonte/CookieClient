import './css/counter-new-messages.css';

import React from 'react';
import {inject, observer} from "mobx-react";

function CounterNewMessages({count}) {
  const style = {};

  if(!count) style.display = 'none';

  return (<em style={ style }><span>{ count }</span></em>);
}

export default inject('store')( observer(CounterNewMessages) );