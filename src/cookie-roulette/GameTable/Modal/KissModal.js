import './css/kiss-modal.css';

import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";

function KissModal({game}) {

  useEffect(() => {
    setTimeout(() => {
      const node = document.querySelector('.kiss-modal .time');
      if(node) {
        if(game.kissWindow === 'closed') node.className = 'time';
        if(game.kissWindow === 'opened') node.classList.add('start');
        if(game.kissResult !== null) node.className = 'time hide';
      }
    }, 50);
  }, [game.kissWindow, game.kissResult]);

  const opened = () => {
    return `kiss-modal center-screen ${game.kissWindow}`;
  };

  const question = () => {
    if(game.kissResult === null) return (<div className="question">Поцелуете?</div>);
    if(game.kissResult) {
      return (
        <div className="question smooth-appear">
          Взаимный поцелуй
          <i className="kiss-result-counter">+1</i>
        </div>
      );
    }
    return (
      <div className="question smooth-appear">
        На этот раз <br/> без поцелуев
      </div>);
  };

  const actions = () => {
    if(game.kissResult !== null) return '';
    return (
      <div className="actions">
        <div className='decline' onClick={ () => game.clickDecision(false, false) }>Отказать</div>
        <div className="accept" onClick={ () => game.clickDecision(true, false) }>Поцеловать</div>
      </div>
    );
  };

  const icon = (kiss, type) => {
    if(kiss == null) return '';
    const icon = kiss ? 'accepted' : 'declined';

    return (<i className={`${type} ${icon}`} />);
  };

  const photo = (id, player) => {
    if(id && player) {
      return {
        backgroundImage: `url("${player.photo}")`
      }
    }

    return {};
  };

  const name = (player) => {
    if(!player) return '';
    if(player.itsMe) return 'Вы';
    return player.name;
  };

  const kissSuccess = () => {
    if(game.kissResult) {
      return 'animate';
    }
  };

  return (
    <section className={opened()}>
      <div className="kiss-modal-shadow" />
      <header>
        {question()}
        <div className='time' />
      </header>
      <div className="info">
        <article className="player" style={ photo(game.activePlayer, game._active) }>
          { icon(game.activeKiss, 'current') }
          <span>{ name(game._active) }</span>
        </article>
        <article className="player" style={ photo(game.targetPlayer, game._target) }>
          { icon(game.targetKiss, 'target') }
          <span>{ name(game._target) }</span>
        </article>
        <i className={ 'true-kiss ' + kissSuccess() } />
      </div>
      {actions()}
    </section>
  );
}

export default inject('store')( observer(KissModal) );