import '../../css/game-table.css';

import React from "react";
import Player from "./Player";
import KissModal from "./KissModal";
import HeaderMenu from "./HeaderMenu";
import CookieSelector from "./CookieSelector";
import Chat from "./Chat";

class GameTable extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <section className="game">
        <article className="table">
          <HeaderMenu />
          <div className="wrap-players">
            <Player user={this.props.users[7]} index="7" />
            <Player user={this.props.users[0]} index="0" />
            <Player user={this.props.users[1]} index="1" />
          </div>
          <div className="wrap-players">
            <Player user={this.props.users[6]} index="6" />
            <div className="cookie-space" />
            <Player user={this.props.users[2]} index="2" />
          </div>
          <div className="wrap-players">
            <Player user={this.props.users[5]} index="5" />
            <Player user={this.props.users[4]} index="4" />
            <Player user={this.props.users[3]} index="3" />
          </div>
          <span className='table-id'>{this.props.tid}</span>
          <CookieSelector />
        </article>
        <KissModal />
        <Chat />
      </section>
    );
  }
}

export default GameTable;