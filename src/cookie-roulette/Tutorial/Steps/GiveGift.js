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
        Окно прокрутчивается посмотри весь список и
        выбери любой <b><i>бесплатный</i></b> подарок который ты хочешь подарить
        в ответ.
      </p>
      <p>
        Затем, нажми на выбранный подарок.
      </p>
    </div>
  );
}

export default GiveGift;