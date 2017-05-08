import React from 'react';
import projects from '../projects.js';
import { Link } from 'react-router-dom';
import Scene from '../Scene';

export default class Main extends React.Component {
  componentDidMount(){
    this.scene = new Scene(this.container);
  }

  render() {
    return (
      <div className="Main">
        <div className="scene-container" ref={(div) => this.container = div}></div>
      </div>
    );
  }
}
