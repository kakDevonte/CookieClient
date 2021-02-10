import React, {useEffect} from 'react';

function WriteMessage({tutorial}) {
  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.personal-chat footer');
  }, []);

  return (
    <div className="write-message-step info center-X" >
      <span className="info-header">Отправь личное сообщение</span>
      <p>
        Скорей, напиши ответное сообщение игроку.
      </p>
    </div>
  );
}

export default WriteMessage;