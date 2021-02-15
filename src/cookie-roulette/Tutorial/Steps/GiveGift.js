import React, {useEffect} from 'react';

function GiveGift({tutorial}) {
  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.utility-wrapper');
  }, []);

  return (
    <div className="give-gift-step info center-X" >
      <span className="info-header">Нажми на подарок!</span>
      <p>
        Посмотри весь список и
        выбери любой <b><i>бесплатный</i></b> подарок и нажми на него.
      </p>
    </div>
  );
}

export default GiveGift;