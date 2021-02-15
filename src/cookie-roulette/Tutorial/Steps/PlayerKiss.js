import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function PlayerKiss({store}) {
  const tutorial = store.tutorial;
  const style = {};

  if(store.app.size.game.height > 600)
    style.top = store.app.size.table.height - 70;

  useEffect(() => {
    tutorial.openShadowLayer();
    tutorial._disAccentAll();
    tutorial.updateKissData('open');
  }, []);

  return (
    <div className="player-kiss-step info center-X" style={style}>
      <span className="info-header">Нажми «Поцеловать»</span>
    </div>
  );
}

export default inject('store')( observer(PlayerKiss) );