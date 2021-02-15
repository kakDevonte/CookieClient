import React, {useEffect} from 'react';

function OpenTalk({store, tutorial}) {
  const player = tutorial._players.get(1);
  const style = {}; if(store.app.size.game.height > 600) style.top = 390;

  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.personal-chat .talk');
  }, []);

  return (
    <div className="open-talk-step info center-X" style={style}>
      <span className="info-header">Выбери беседу</span>
      <p>
        Это {player.name}. Думаю, тебе стоит ответить.
      </p>
    </div>
  );
}

export default OpenTalk;