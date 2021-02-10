import React, {useEffect} from 'react';

function OpenTalk({tutorial}) {
  const player = tutorial._players.get(1);

  useEffect(() => {
    tutorial._accentItem('.utility-wrapper');
    tutorial.openShadowLayer();
  }, []);

  return (
    <div className="open-talk-step info center-X" >
      <span className="info-header">У тебя личное сообщение</span>
      <p>
        {player.name} написал тебе личное сообщние, надо и тебе ответить.
      </p>
      <p>
        Нажми «Личные сообщения», а затем нажми на «беседу».
      </p>
    </div>
  );
}

export default OpenTalk;