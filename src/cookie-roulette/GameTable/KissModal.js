import '../../css/kiss-modal.css';

import React, {useState, useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";

function KissModal({store}) {

  const game = store.game;
  const [timeStart, setTimeStart] = useState(null);


  // useEffect(() => {
  //   if(decision.current.result !== null && decision.target.result !== null) {
  //     setKissResult(
  //       decision.current.result && decision.target.result
  //     );
  //     setTimeout(() => {
  //       store.game.setStageDecision('closed');
  //     }, 2500);
  //   }
  // }, [decision.current.result, decision.target.result]);

  const opened = () => {
    return `kiss-modal center-screen ${game.kissWindow}`;
  };

  const question = () => {
    if(game.kissResult === null) return (<div className="question">Поцелуете?</div>);
    if(game.kissResult) return (<div className="question">Взаимный поцелуй</div>);
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
    if(game.kissResult !== null) return '';
    return (
      <div className="actions">
        <div className='decline' onClick={ () => game.clickDecision(false) }>Отказать</div>
        <div className="accept" onClick={ () => game.clickDecision(true) }>Поцеловать</div>
      </div>
    );
  };

  const icon = (kiss, type) => {
    if(kiss == null) return '';
    const icon = kiss ? 'accepted' : 'declined';

    return (<i className={`${type} ${icon}`} />);
  };

  // const clickHandler = (result) => {
  //   if(timeoutId.current !== 0) clearTimeout(timeoutId.current);
  //   store.game.updateDecisionResult('current', result);
  //   setTimeStart(false);
  //   setActions(false);
  // };

  const photo = (id, player) => {
    if(id) {
      return {
        backgroundImage: `url("${player.photo}")`
      }
    }

    return {};
  };

  return (
    <section className={opened()}>
      {question()}
      {time()}
      <div className="info">
        <article className="player" style={ photo(game.activePlayer, game._active) }>{ icon(game.activeKiss, 'current') }</article>
        <article className="player" style={ photo(game.targetPlayer, game._target) }>{ icon(game.targetKiss, 'target') }</article>
      </div>
      {actions()}
    </section>
  );
}

export default inject('store')( observer(KissModal) );