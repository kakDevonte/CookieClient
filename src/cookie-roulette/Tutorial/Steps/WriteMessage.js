import React, {useEffect} from 'react';

function WriteMessage({tutorial}) {
  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.personal-chat footer');
  }, []);

  return (
    <div className="write-message-step info center-X" >
      <span className="info-header">Отправь личное сообщение</span>
      <p style={{textAlign: 'center'}}>Напиши ответное сообщение игроку.</p>
      <div className="arrow-write-message" />
    </div>
  );
}

export default WriteMessage;