import React, {Component, PropTypes} from 'react';
import UUID from 'uuid';

class AddProjectComponent extends Component {

  state = {
    id: this.props.project.id,
    title: this.props.project.title,
    category: this.props.project.value
  }


  handleSetState = (project) => {
    this.setState({
      id: project.id,
      title: project.title,
      category: project.category
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project !== null){
      this.handleSetState(nextProps.project);
    } else {
      this.handleResetState();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let id = UUID.v4();
    let obj = {title: this.state.title, category: this.state.category};
    this.handleResetState();
    if (this.state.id != null) {
      obj.id = this.state.id;
      this.context.updateProject(obj);
    } else {
      obj.id = id;
      this.props.handleAddProject(obj);
    }
  }

  handleResetState() {
    this.setState({
      id: null,
      title: '',
      category: ''
    });
  }

  handleCancel = e => {
    e.preventDefault();
    this.handleResetState();
    this.context.cancelEditProject();
  }

  handleTitleChange = e => {
    const value = e.target.value;
    this.setState({
      title: value
    });
  }

  handleCategoryChange  = e => {
    const value = e.target.value;
    this.setState({
      category: value
    });
  }


  render() {
    const categories = ['Web Design', 'Web Development', 'mobile application'];

    let options = categories.map(category => {
      return (
        <option key={category} value={category}>{category}</option>
      );
    });

    return (
      <div className="add-project-container">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <label htmlFor="name">Title</label>
            <input value={this.state.title} onChange={this.handleTitleChange} type="text" name="name" />
          </div>
          <div className="row">
            <label htmlFor="category">Category</label>
            <select value={this.state.category} onChange={this.handleCategoryChange} name="category">
              {options}
            </select>
            <p>category : {this.state.category}</p>
          </div>
          <div className="row">
            <input type="submit" value={this.state.id ? "Update Project": "Add Project"}/>
            <input type="button" onClick={this.handleCancel} value="Cancel"/>
          </div>
        </form>
      </div>
    );
  }
}

AddProjectComponent.defaultProps = {
  project: {
    id: null,
    title: '',
    category: ''
  }
};

AddProjectComponent.contextTypes = {
  cancelEditProject: PropTypes.func,
  updateProject: PropTypes.func
};

export default AddProjectComponent;
