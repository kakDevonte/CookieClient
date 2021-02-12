import React, {useEffect} from 'react';

function EndTutorial({tutorial}) {
  useEffect(() => {
    tutorial._disAccentAll();
    tutorial._accentItem('.change-table');
  }, []);

  return (
    <div className="end-tutorial-step info center-X" >
      <span className="info-header">Поздравляем!</span>
      <p>
        Теперь ты умеешь, целоваться, общаться, дарить подарки!
        Давай закончим обучение и перейдем к столу с реальными людьми.
      </p>
      <span className="info-header">Нажми на кнопку «Смены стола»</span>
    </div>
  );
}

export default EndTutorial;