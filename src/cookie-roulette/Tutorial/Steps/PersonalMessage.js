import React, {useEffect} from 'react';

function PersonalMessage({store, tutorial}) {
  const style = {};

  if(store.app.size.game.height > 600)
    style.top = store.app.size.table.height - 115;

  useEffect(() => {
    tutorial._accentItem('.chat header div:last-child');
    tutorial.openShadowLayer();
  }, []);

  return (
    <div className="personal-message-step info center-X" style={style}>
      <span className="info-header">Нажми «Личные сообщения»</span>
      <p>
        Кто-то отправил тебе личное сообщение. Хорошо бы узнать, что там.
      </p>
    </div>
  );
}

export default PersonalMessage;