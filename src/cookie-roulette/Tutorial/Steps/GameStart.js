import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function GameStart({store}) {

  useEffect(() => {
    if(store.user.data.sex === 1) {
      store.tutorial._createBotsFromFemale();
    } else {
      store.tutorial._createBotsFromMale();
    }

    setTimeout(() =>  store.tutorial.setActiveSeat(4), 7000);
  }, []);

  return (
    <div className="game-start-step info center-XY" />
  );
}

export default inject('store')( observer(GameStart) );