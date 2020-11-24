import '../../css/kiss-modal.css';

import React, {useState, useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";

function KissModal({store}) {
  const decision = store.game.kissDecision;

  const [action, setActions] = useState(true);
  const [timeStart, setTimeStart] = useState(null);
  const [kissResult, setKissResult] = useState(null);

  let timeoutId = useRef(0);

  useEffect(() => {
    if(decision.stage === 'open') {

      setTimeout(() => {
        setTimeStart(true);
      }, 250);


      timeoutId.current = setTimeout(() => {
        clickHandler(false);
      }, 5250);

    }
  }, [decision.stage]);

  useEffect(() => {
    if(decision.current.result !== null && decision.target.result !== null) {
      setKissResult(
        decision.current.result && decision.target.result
      );
      setTimeout(() => {
        store.game.setStageDecision('closed');
      }, 2500);
    }
  }, [decision.current.result, decision.target.result]);

  const opened = () => {
    const state = decision.stage !== 'closed' ? 'opened' : '';

    return `kiss-modal center-screen ${state}`;
  };

  const question = () => {
    if(kissResult === null) return (<div className="question">Поцелуете?</div>);
    if(kissResult) return (<div className="question">Взаимный поцелуй</div>);
    return (<div className="question">На этот раз <br/> без поцелуев</div>);
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

  const icon = (type) => {
    if(decision[type].result == null) return '';
    const icon = decision[type].result ? 'accepted' : 'declined';

    return (<i className={`${type} ${icon}`} />);
  };

  const clickHandler = (result) => {
    if(timeoutId.current !== 0) clearTimeout(timeoutId.current);
    store.game.updateDecisionResult('current', result);
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
        <article className="player" style={ photo('current') }>{ icon('current') }</article>
        <article className="player" style={ photo('target') }>{ icon('target') }</article>
      </div>
      {actions()}
    </section>
  );
}

export default inject('store')( observer(KissModal) );