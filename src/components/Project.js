import React from 'react';
import projects from '../projects.js'
import { Link } from 'react-router-dom';

export default class Project extends React.Component {
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
