import '../../css/kiss-modal.css';

import React, {useState, useEffect} from "react";
import {inject, observer} from "mobx-react";

function KissModal({store}) {
  const decision = store.game.kissDecision;

  const [action, setActions] = useState(true);
  const [resultKiss, setResultKiss] = useState(null);
  const [timeStart, setTimeStart] = useState(null);


  useEffect(() => {
    if(decision.stage === 'open') {

      setTimeout(() => {
        setTimeStart(true);
      }, 250);


      setTimeout(() => {
        clickHandler(false);
      }, 5250);

    }
  }, [decision.stage]);

  const opened = () => {
    const state = decision.stage !== 'closed' ? 'opened' : '';

    return `kiss-modal center-screen ${state}`;
  };

  const question = () => {
    if(true) {
      return (<div className="question">Поцелуете?</div>);
    } else {
      return (<div className="question">На этот раз <br/> без поцелуев</div>);
    }
  };

  const time = () => {
    let _class;

    if(timeStart === null) _class = 'time';
    if(timeStart === true) _class = 'time start';
    if(timeStart === false) return '';

    return (<div className={_class} />);
  };

  const actions = () => {
    if(!action) return '';
    return (
      <div className="actions">
        <div className='decline' onClick={ () => clickHandler(false) }>Отказать</div>
        <div className="accept" onClick={ () => clickHandler(true) }>Поцеловать</div>
      </div>
    );
  };

  const currentIcon = () => {
    if(resultKiss == null) return '';
    const icon = resultKiss ? 'accepted' : 'declined';

    return (<i className={`current ${icon}`} />);
  };

  const targetIcon = () => {
    if(true) return '';
    return (<i className="target" />);
  };

  const clickHandler = (result) => {
    setResultKiss(result);
    setTimeStart(false);
    setActions(false);
  };

  const photo = (type) => {
    if(decision[type].player) {
      return {
        backgroundImage: `url("${decision[type].player.photo}")`
      }
    }

    return {};
  };

  return (
    <section className={opened()}>
      {question()}
      {time()}
      <div className="info">
        <article className="player" style={ photo('current') }>{ currentIcon() }</article>
        <article className="player" style={ photo('target') }>{ targetIcon() }</article>
      </div>
      {actions()}
    </section>
  );
}

export default inject('store')( observer(KissModal) );