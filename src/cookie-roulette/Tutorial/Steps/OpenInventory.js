import React, {useEffect} from 'react';

function OpenInventory({tutorial}) {
  useEffect(() => {
    tutorial.openShadowLayer();
    tutorial._disAccentAll();
    tutorial._accentItem('.player.p1');
  }, []);

  return (
    <div className="open-inventory-step info center-XY" >
      <div className="arrow-target-photo" />
      <span className="info-header">Нажми на фото!</span>
      <p>
        Смотри, Дмитрий угостил тебя коктейлем!
        Давай сделаем ему ответный подарок.
      </p>
    </div>
  );
}

export default OpenInventory;