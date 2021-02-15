import React, {useEffect} from 'react';

function GiveGift({store, tutorial}) {
  const style = {};

  if(store.app.size.game.height > 600) style.top = 325;

  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.utility-wrapper');
  }, []);

  return (
    <div className="give-gift-step info center-X" style={style}>
      <div className="arrow-target-gift" />
      <span className="info-header">Нажми на подарок!</span>
      <p>
        Посмотри весь список и
        выбери любой <b><i>бесплатный</i></b> подарок и нажми на него.
      </p>
    </div>
  );
}

export default GiveGift;