import React, { Component, PropTypes } from 'react';
import ProjectItemComponent from './project-item-component';

class ProjectsComponent extends Component {
  render() {
    let projects = this.props.projects;
    let ProjectItems = projects.map(project => {
      return (
        <ProjectItemComponent key={project.id} project={project} />
      );
    });

    return (
      <div>{ProjectItems}</div>
    );
  }
}

ProjectsComponent.propTypes = {
  projects: PropTypes.array.isRequired
}


export default ProjectsComponent;
