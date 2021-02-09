import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function GameStart({store}) {

  useEffect(() => {
    store.tutorial.closeShadowLayer();

    if(store.user.data.sex === 1) {
      store.tutorial._createBotsFromFemale();
    } else {
      store.tutorial._createBotsFromMale();
    }
  }, []);

  return (
    <div />
  );
}

export default inject('store')( observer(GameStart) );