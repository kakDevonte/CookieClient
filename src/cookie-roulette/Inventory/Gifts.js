
import React from 'react';
import {inject, observer} from "mobx-react";

import Group from "./Group";


function Gifts({store, gifts}) {
  const m = [];

  gifts.forEach((value, key) => {
    if(value.gifts.length){
      m.push(<Group group={value} key={key} type={key}/>);
    }
  });

  return m;
}

export default inject('store')( observer(Gifts) );