import React, {useEffect} from 'react';

function GiftSelected({tutorial}) {
  useEffect(() => {
    tutorial._disAccentAll();
  }, []);

  return (
    <div className="gift-selected-step info center-X" >
      <span className="info-header">Нажми «Подарить»</span>
    </div>
  );
}

export default GiftSelected;