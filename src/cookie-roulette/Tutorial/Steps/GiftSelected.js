import React, {useEffect} from 'react';

function GiftSelected({tutorial}) {
  useEffect(() => {
    tutorial._disAccentAll();
  }, []);

  return (
    <div className="gift-selected-step info center-X" >
      <span className="info-header">Нажми «Подарить»</span>
      <p>
        Это окно подтверждения.
        Оно открывается, когда ты нажал на подарок,
        намеренно или случайно, чтобы всегда можно было передумать.
      </p>
    </div>
  );
}

export default GiftSelected;