import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function Step({store}) {

  useEffect(() => {
    if(store.user.data.sex === 1) {
      store.tutorial._createBotsFromFemale();
    } else {
      store.tutorial._createBotsFromMale();
    }

    setTimeout(() =>  store.tutorial.setActiveSeat(4), 7000);
  }, []);

  return (
    <div className="step-2 info center-XY">

    </div>
  );
}

export default inject('store')( observer(Step) );