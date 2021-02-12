import React, {useEffect} from 'react';

function OpenTalk({tutorial}) {
  const player = tutorial._players.get(1);

  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.personal-chat .talk');
  }, []);

  return (
    <div className="open-talk-step info center-X" >
      <span className="info-header">Выбери беседу</span>
      <p>
        Это {player.name}. Думаю, тебе стоит ответить.
      </p>
    </div>
  );
}

export default OpenTalk;