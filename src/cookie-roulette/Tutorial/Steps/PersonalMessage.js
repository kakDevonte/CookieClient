import React, {useEffect} from 'react';

function PersonalMessage({tutorial}) {
  useEffect(() => {
    tutorial._accentItem('.chat header div:last-child');
    tutorial.openShadowLayer();
  }, []);

  return (
    <div className="personal-message-step info center-X" >
      <span className="info-header">Нажми «Личные сообщения»</span>
      <p>
        Кто-то отправил тебе личное сообщение. Хорошо бы узнать, что там.
      </p>
    </div>
  );
}

export default PersonalMessage;