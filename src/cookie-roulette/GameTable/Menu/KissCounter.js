import React, {useState} from 'react';
import common from "../../../config/common";

function KissCounter({kisses}) {
  const [classTooltip, setClassTooltip] = useState('tooltip center-X');

  const showTooltip = () => {
    setClassTooltip('tooltip center-X opened');

    setTimeout(() => {
      setClassTooltip('tooltip center-X');
    }, 2000);
  };

  return (
    <section className="kiss-count" onClick={ () => showTooltip() }>
      <i />
      <span>{kisses}</span>
      <div className={ classTooltip }>
        Вас поцеловали: { common.wordEnding(kisses, ['раз', 'раза', 'раз']) }
        <div className="arrow-up center-X" />
      </div>
    </section>
  );
}

export default KissCounter;