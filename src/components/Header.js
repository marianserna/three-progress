import React from 'react';
import { TweenMax } from 'gsap';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header-content">
          <h1>TRACKING <br/> PROGRESS</h1>
          <p>Interactive Projects <br/> with Three.js</p>
          <h3>Marian <br/> Serna</h3>
        </div>
        <div className="header-line">
          <hr/>
        </div>
      </header>
    );
  }
}
