import React from "react";

class Player extends React.Component{
  constructor(props){
    super(props);
  }

  userName(){
    if(this.props.user) {
      return this.props.user.name;
    } else {
      return '';
    }
  }

  userKissed(){
    if(this.props.user) {
      return <Kissed count={this.props.user.kissed.length} />
    } else {
      return '';
    }
  }

  render(){
    return (
      <article className="player">
        {this.userName()}
        {this.userKissed()}
      </article>
    );
  }
}

class Kissed extends React.Component{
  render(){
    return(
      <span className='kissed'>Поцелуев: {this.props.count}</span>
    );
  }
}

export default Player;