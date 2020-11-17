import React from "react";
import Player from "./Player";
import KissModal from "./KissModal";

class GameTable extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <section className="table">
        <Player user={this.props.users[0]} />
        <Player user={this.props.users[1]} />
        <Player user={this.props.users[2]} />
        <Player user={this.props.users[7]} />
        <div className="cookie">Печенька!</div>
        <Player user={this.props.users[3]} />
        <Player user={this.props.users[6]} />
        <Player user={this.props.users[5]} />
        <Player user={this.props.users[4]} />
        <span className='table-id'>{this.props.tid}</span>
      </section>
    );
  }
}

export default GameTable;