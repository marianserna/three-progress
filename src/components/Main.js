import React from 'react';
import projects from '../projects.js';
import { Link } from 'react-router-dom';
import Scene from '../Scene';

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      visible : false,
      positionX: 50,
      positionY: 50,
      projectKey: ''
    }
  }

  componentDidMount(){
    this.scene = new Scene(
      this.container,
      this.showProjectImage
    );
  }

  showProjectImage = (key, x, y) => {
    this.setState({
      visible : true,
      positionX: x - 75,
      positionY: y - 75,
      projectKey: key
    })
  }


  render() {
    const circularImage = this.state;

    return (
      <div className="Main">
        <div className="scene-container" ref={(div) => this.container = div}></div>
          {
            circularImage.visible ?
              <div className="project-image" style={{top: circularImage.positionY, left: circularImage.positionX}}>
                <img src={projects[circularImage.projectKey].image} alt={projects[circularImage.projectKey]}/>
              </div>
            : ''
          }
      </div>
    );
  }
}
