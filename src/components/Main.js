import React from 'react';
import projects from '../projects.js';
import { Link } from 'react-router-dom'

export default class Main extends React.Component {
  render() {

  const projectList =  Object.keys(projects).map((key) => {
      const project = projects[key];
      return (
        <li>
          <Link to={`/projects/${key}`}>
            <img src={project.image} alt={project.name}/>
          </Link>
           <h3>{project.name}</h3>
        </li>
      );
    });

    return (
      <div className="Main">
        <ul>{projectList}</ul>
      </div>
    );
  }
}
