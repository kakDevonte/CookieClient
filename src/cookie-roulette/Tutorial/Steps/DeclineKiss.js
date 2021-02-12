import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";

function DeclineKiss({store}) {
  const tutorial = store.tutorial;
  const player = store.tutorial._players.get(3);

  useEffect(() => {
    tutorial._accentItem('.kiss-modal .kiss-modal-shadow');
    tutorial._accentItem('.kiss-modal .accept');
  }, []);

  return (
    <div className="decline-kiss-step info center-X" >
      <p>
        Не делай так, { player.name } огорчится. Не стоит огорчать нашего гостя!
      </p>
      <p style={ {fontSize: '120%'} }>
        Нажми, пожалуйста, «Поцеловать».
      </p>
    </div>
  );
}

export default inject('store')( observer(DeclineKiss) );