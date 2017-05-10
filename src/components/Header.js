import React from 'react';
import { TweenMax, TimelineLite } from 'gsap';

export default class Header extends React.Component {
  componentDidMount() {
    this.animateMain();
  }

  animateMain = () => {
    const tl = new TimelineLite();
    tl.from('#header-1', 0.3, {y: -100, opacity: 0}).
      from('#header-2', 0.3, {y: -100, opacity: 0}).
      from('#header-3', 0.3, {y: -100, opacity: 0}).
      from('#header-4', 0.5, {x: -1000}).
      from('#header-5', 0.3, {x: -100, opacity: 0})
    tl.play();
  }

  render() {
    return (
      <header>
        <div className="header-content">
          <h1 id="header-1">TRACKING <br/>PROGRESS</h1>

          <p id="header-2">
            <span>CREATIVE DEVELOPMENT:</span>
            <br/>
            BASIC INTERACTIVE
            <br/>
            PROJECTS WITH THREE.JS
          </p>

          <p id="header-3">
            <a href="https://www.marianserna.com/" target="_blank">
              MARIAN <br/>SERNA
            </a>
          </p>
        </div>

        <div className="header-line">
          <hr id="header-4"/>
        </div>
        <div className="legend" id="header-5">
          <p>Click green circles</p>
        </div>
      </header>
    );
  }
}
