import './css/kissed.css';

import React from "react";
import {inject, observer} from "mobx-react";

function Kissed({store, count}) {
  return(
    <span className='current-kiss'>{count}</span>
  );
}

export default inject('store')(observer(Kissed));