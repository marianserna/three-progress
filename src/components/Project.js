import React from 'react';
import projects from '../projects.js'
import { Link, Redirect } from 'react-router-dom';
import { TweenMax, TimelineLite } from 'gsap';

export default class Project extends React.Component {

  componentDidMount() {
    this.animateProject();
    this.nextOnRight();
  }

  componentWillReceiveProps(nextProps) {
    this.animateProject();
  }

  animateProject = () => {
    const tl = new TimelineLite();
    tl.fromTo('.video-container video', 1, {x: -1000, opacity: 0}, {x: 0, opacity: 1}).
      fromTo('.content-container', 1.5, {opacity: 0}, {opacity: 1}).
      fromTo('.home-link', 0, {opacity: 0}, {opacity: 1}).
      fromTo('.next-link', 0, {opacity: 0}, {opacity: 1})
    tl.play();
  }

  nextOnRight = () => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowRight') {
        const slug = this.props.match.params.slug;
        const project = projects[slug];
        window.location.replace(this.nextPath(project.number));
        // w React Router (conflicts w animation):
        // this.props.history.push(this.nextPath(project.number));
      }
    });
  }

  nextPath = (number) => {
    let key = this.projectKey(number + 1);
    if (key === undefined) {
      key = this.projectKey(1);
    }
    return `/projects/${key}`;
  }

  projectKey = (number) => {
    const keys = Object.keys(projects);
    const found = keys.find((key) => {
      return projects[key].number === number;
    });

    return found;
  }

  render() {
    const slug = this.props.match.params.slug;
    const project = projects[slug];

    return (
      <div>
        <div className="project">
          <div className="home-link">
            <Link to={'/'}>HOME</Link>
          </div>

          <div className="video-container">
            <video src={project.video} autoPlay loop></video>
          </div>

          <div className="content-container">
            <h2>{project.number}. {project.name}</h2>
            <div className="description">{project.description}</div>
            <a className="redirect" href={project.fullProject} target="_blank">See Full Project</a>
          </div>

          <div className="next-link">
            <Link to={this.nextPath(project.number)}>NEXT</Link>
          </div>
        </div>
      </div>
    );
  }
}
