import React, {useEffect} from 'react';

function OpenInventory({tutorial}) {
  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.player.p1');
  }, []);

  return (
    <div className="open-inventory-step info" >
      <span className="info-header">Нажми на портрет!</span>
      <p>
        Что бы подарить подарок, написать личное сообщение, или посмотерть профиль игрока,
        нужно открыть специальное окно.
      </p>
      <p>
        Нажми на портрет игрока с которым хочешь взаимодействовать, что бы открыть такое окно.
      </p>
    </div>
  );
}

export default OpenInventory;