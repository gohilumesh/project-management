import React, {Component, PropTypes} from 'react';

class ProjectItemComponent extends Component {

  render() {
      let project = this.props.project;
    return (
      <li>
        {project.title} --- {project.category}
        <a href="#" onClick={() => this.context.deleteProject(project.id) }> X </a>
        <a href="#" onClick={() => this.context.editProject(project) }> edit </a>

      </li>
    );
  }
}

ProjectItemComponent.contextTypes = {
  deleteProject: PropTypes.func,
  editProject: PropTypes.func,
};

export default ProjectItemComponent;
