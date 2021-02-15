import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function PlayerKiss({store}) {
  const tutorial = store.tutorial;

  useEffect(() => {
    tutorial.openShadowLayer();
    tutorial._disAccentAll();
    tutorial.updateKissData('open');
  }, []);

  return (
    <div className="player-kiss-step info center-X" >
      <span className="info-header">Нажми «Поцеловать»</span>
    </div>
  );
}

export default inject('store')( observer(PlayerKiss) );