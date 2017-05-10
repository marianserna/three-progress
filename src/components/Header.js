import React from 'react';
import { TweenMax } from 'gsap';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header-content">
          <h1>TRACKING <br/>PROGRESS</h1>
          <p><span>CREATIVE DEVELOPMENT:</span><br/> INTERACTIVE PROJECTS <br/> WITH THREE.JS</p>
          <p>
            <a href="https://www.marianserna.com/" target="_blank">
              MARIAN <br/>SERNA
            </a>
          </p>
        </div>
        <div className="header-line">
          <hr/>
        </div>
      </header>
    );
  }
}
