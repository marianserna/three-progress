import React from 'react';
import projects from '../projects.js';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Scene from '../Scene';
import { TweenMax } from 'gsap';

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

  componentDidMount() {

    this.scene = new Scene(
      this.container,
      this.showProjectImage,
      this.hideProjectImage
    );

    this.preloadImages();
    this.hideOnEscape();
  }

  preloadImages = () => {
    Object.keys(projects).forEach((key) => {
      const image = new Image();
      image.src = projects[key].image;
    });
  }

  hideOnEscape = () => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        this.hideProjectImage();
      }
    });
  }

  showProjectImage = (key, x, y) => {
    this.setState({
      visible : true,
      positionX: x - 75,
      positionY: y - 75,
      projectKey: key
    });

    TweenMax.fromTo('.project-image img', 0.5, {width: 0}, {width:180});
  }

  hideProjectImage = () => {
    this.setState({
      visible: false
    });
  }


  render() {
    const circularImage = this.state;

    return (
      <div className="Main">

        <Header />

        <div className="scene-container">
          <div ref={(div) => this.container = div}></div>
          {
            circularImage.visible ?
              <div className="project-image" style={{top: circularImage.positionY, left: circularImage.positionX}}>
                <Link to={`/projects/${this.state.projectKey}`}>
                  <img src={projects[circularImage.projectKey].image} alt={projects[circularImage.projectKey]}/>
                </Link>
              </div>
            : ''
          }
        </div>

        <Footer />
      </div>
    );
  }
}
