import '../../css/player.css';

import React from "react";

class Player extends React.Component{
  constructor(props){
    super(props);
  }

  _userName(){
    if(this.props.user) {
      if(this.props.user.itsMe){
        return (<span className="player-name">Вы</span>);
      } else {
        return <span className="player-name">{this.props.user.name}</span>
      }
    } else {
      return '';
    }
  }

  _userKissed(){
    if(this.props.user && this.props.user.kissed.length) {
      return <Kissed count={this.props.user.kissed.length} />
    } else {
      return '';
    }
  }

  _playerClass(){
    return 'player p' + this.props.index;
  }

  _playerPhoto(){
    if(this.props.user) {
      return {
        backgroundImage: `url("${this.props.user.photo}")`,
        backgroundSize: 'cover'
      }
    } else {
      return {};
    }
  }

  render(){
    return (
      <article className={this._playerClass()} style={this._playerPhoto()}>
        <span className="turn-player">Крутит</span>
        {this._userName()}
        {this._userKissed()}
      </article>
    );
  }
}

class Kissed extends React.Component{
  render(){
    return(
      <span className='current-kiss'>{this.props.count}</span>
    );
  }
}

export default Player;