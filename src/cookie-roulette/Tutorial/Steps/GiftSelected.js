import React, {useEffect} from 'react';

function GiftSelected({tutorial}) {
  useEffect(() => {
    tutorial._disAccentAll();
  }, []);

  return (
    <div className="gift-selected-step info center-X" >
      <span className="info-header">Нажми «Подарить»</span>
      <p>
        Это окно подврждения.
        Оно открывается когда ты нажал на подарок,
        намеренно или случайно, что бы всегда можно было передумать.
      </p>
      <p>
        Ты уже выбрал <b><i>бесплатный</i></b> подарок, поэтому нажми «Подарить»
      </p>
    </div>
  );
}

export default GiftSelected;