import React, {useEffect} from 'react';

function GiftSelected({store, tutorial}) {
  const style = {display: 'none'}; // if(store.app.size.game.height > 600) style.top = 570;

  useEffect(() => {
    tutorial._disAccentAll();
  }, []);

  return (
    <div className="gift-selected-step info center-X" style={style} >
      <span className="info-header">Нажми «Подарить»</span>
    </div>
  );
}

export default GiftSelected;