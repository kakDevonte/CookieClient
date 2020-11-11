import React from "react";

class Player extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <article className="player">
        <Kissed count={this.props.kissed.length} />
      </article>
    );
  }
}

class Kissed extends React.Component{
  render(){
    return(
      <span>Поцелуев: {this.props.count}</span>
    );
  }
}

export default Player;