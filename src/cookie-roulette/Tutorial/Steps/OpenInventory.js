import React, {useEffect} from 'react';

function OpenInventory({store, tutorial}) {
  const player = tutorial._players.get(1);
  const photo = document.querySelector('.player.p1');
  const style = {};
  const end = store.user.data.sex === 1 ? '' : 'а';
  const target = store.user.data.sex === 1 ? 'ему' : 'ей';

  if(store.app.size.game.height > 600) {
    if(photo) {
      style.top = photo.getBoundingClientRect().bottom + 40;
    } else {
      style.top = 230;
    }
  }
  console.log("получаем подарок 2")

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
        Смотри, { player.name } угостил{ end } тебя коктейлем!
        Давай сделаем {target} ответный подарок.
      </p>
    </div>
  );
}

export default OpenInventory;