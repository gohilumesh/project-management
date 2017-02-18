import React, { Component, PropTypes } from 'react';
import './App.css';
import Projects from './components/projects-component.js'
import AddProject from './components/add-project-component';
import UUID from 'uuid';

class App extends Component {

  getChildContext() {
    return {
      deleteProject: this.handleProjectDelete,
      editProject: this.handleEditProject,
      cancelEditProject: this.cancelEditProject,
      updateProject: this.updateProject
    };
  }

  cancelEditProject = () => {
    this.setState({
      editProject: null
    });
  }

  updateProject = ( project ) => {
    let projects = this.state.projects;
    let updatedProjects = projects.map(proj => {
      return proj.id === project.id ? project : proj;
    });
    this.setState({
      projects : updatedProjects
    });
  }

  handleEditProject = project=> {
    this.setState({
      editProject: project
    });
  }

  handleProjectDelete = id => {
    let projects = this.state.projects;
    let filteredProjects = projects.filter(project => {
      return project.id !== id;
    });
    let isEditBeingDeleted = this.state.editProject.id === id;

    if (isEditBeingDeleted) {
      this.setState({
        projects: filteredProjects,
        editProject: null
      });

    } else {
      this.setState({
        projects: filteredProjects
      });

    }

  }


  state = {
    projects: [
      {
        id: UUID.v4(),
        category: 'Web Development',
        title: 'ticketmaster'
      },
      {
        id: UUID.v4(),
        category: 'Web Design',
        title: 'Twiter'
      },
      {
        id: UUID.v4(),
        category: 'mobile application',
        title: 'WhatApp'
      }
    ]
  }

  handleAddProject = (project) => {
    let projects = this.state.projects;
    projects.push(project);
    this.setState(
      projects: projects
    );
  }

  render() {
    return (
      <div className="container">
        <AddProject project={this.state.editProject} handleAddProject={this.handleAddProject}/>
        <Projects projects={this.state.projects}/>
      </div>
    );
  }
}

App.childContextTypes = {
  deleteProject: PropTypes.func,
  editProject: PropTypes.func,
  cancelEditProject: PropTypes.func,
  updateProject: PropTypes.func
};

export default App;
