import React from 'react';
import projects from '../projects.js'

export default class Project extends React.Component {
  render() {

    const slug = this.props.match.params.slug;
    const project = projects[slug];

    return (
      <div className="Project">
        <div className="video-container">
          <video src={project.video} autoPlay loop></video>
        </div>
        <h2>{project.name}</h2>
        <div className="description">{project.description}</div>
        <a href={project.fullProject} target="_blank">Full Project</a>
      </div>
    );
  }
}
