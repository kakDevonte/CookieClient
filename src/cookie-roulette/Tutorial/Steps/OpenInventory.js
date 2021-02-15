import React, {useEffect} from 'react';

function OpenInventory({store, tutorial}) {
  const style = {}; if(store.app.size.game.height > 600) style.top = 230;

  useEffect(() => {
    tutorial.openShadowLayer();
    tutorial._disAccentAll();
    tutorial._accentItem('.player.p1');
  }, []);

  return (
    <div className="open-inventory-step info center-X" style={style} >
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