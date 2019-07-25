import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Catagory from './catagory/catagory';
import Task from './task/task';
import TaskEditor from './task-editor/task-editor';
import logo_bin from './assets/bin.svg';
import logo_add from './assets/add.svg';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      editTask: {
        subject: '',
        info: ''
      },
      tasks: [
        {
          subject: 'Lorem ipsum dolor sit',
          info: 'Lorem ipsum dolor sit amet.',
          catagory: 'all',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus eros, sodales nec volutpat non, finibus in ante. Nulla facilisi.',
          catagory: 'all',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus eros',
          catagory: 'progress',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum ',
          catagory: 'todo',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum dolor sit amet.',
          catagory: 'completed',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus eros, sodales nec volutpat non, finibus in ante. Nulla facilisi.',
          catagory: 'all',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus eros',
          catagory: 'completed',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum ',
          catagory: 'all',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum dolor sit amet.',
          catagory: 'completed',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus eros, sodales nec volutpat non, finibus in ante. Nulla facilisi.',
          catagory: 'all',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus eros',
          catagory: 'all',
          creationDate: 1564052495295
        },
        {
          subject: 'Lorem ipsum',
          info: 'Lorem ipsum..',
          catagory: 'todo',
          creationDate: 1564052495295
        }
      ]
    };

    // Bind the event handlers
    this.toggleModalVisible = this.toggleModalVisible.bind(this);
    this.editTask = this.editTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleChangeInfo = this.handleChangeInfo.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
  }

  // Add new task or edit task? 
  // Values: edit, new
  operationType = 'new';

  // Toggles modal visibilty
  toggleModalVisible() {
    // Set the task operation as add new task
    this.operationType = 'new';

    this.setState((prevState) => {
      return {
        modalVisible: !prevState.modalVisible
      }
    })
  }

  // Handles change of subject field
  handleChangeSubject(e) {
    this.setState({
      editTask: {
        info: this.state.editTask.info,
        subject: e.target.value
      }
    });
  }

  // Handles change of info field
  handleChangeInfo(e) {
    this.setState({
      editTask: {
        subject: this.state.editTask.subject,
        info: e.target.value
      }
    });
  }

  // Edits a task
  editTask(e) {

  }

  // Adds a new task
  addTask() {
    this.setState((prevState) => {
      // Create new task object from recently edited task
      // Creation date-time: current date-time
      // Default catagory: all
      let newTask = {
        ...prevState.editTask,
        creationDate: new Date(),
        catagory: 'all'
      };

      // Current tasks
      let tasks = prevState.tasks;

      // Push the new task
      tasks.push(newTask);

      // Reset the editTask values
      let newEditTask = {
        subject: '',
        info: ''
      }

      return { tasks, editTask: newEditTask };
    }, this.toggleModalVisible);
  }

  render() {
    // Filter out tasks based on their catagories
    let tasksAll = this.state.tasks.filter((task) => task.catagory === 'all');
    let tasksTodo = this.state.tasks.filter((task) => task.catagory === 'todo');
    let tasksProgress = this.state.tasks.filter((task) => task.catagory === 'progress');
    let tasksCompleted = this.state.tasks.filter((task) => task.catagory === 'completed');

    return (
      <div>
        <TaskEditor visible={ this.state.modalVisible } close={ this.toggleModalVisible } operationType={ this.operationType } subjectChanged={ this.handleChangeSubject } infoChanged={ this.handleChangeInfo } addNew={ this.addTask } update={ this.editTask } subject={ this.state.editTask.subject } info={ this.state.editTask.info } />

        <div className="container app">
          
          <button type="button" className="btn-custom btn-add" onClick={ () => {
            this.operationType = 'new';
            this.toggleModalVisible();
          } }> <img src={ logo_add } alt="Add button logo" />
          </button>

          <div className="btn-custom btn-bin">
            <img src={ logo_bin } alt="Bin button logo" />
          </div>

          <div className="title">
            <h1 className="text-center">Week Plannar</h1>
          </div>
    
          <div className="row">
            <Catagory title="All">
              { tasksAll.map((task, idx) => <Task task={ task } taskIdx={ idx } key={ idx } />) }
            </Catagory>
            <Catagory title="To Do">
              { tasksTodo.map((task, idx) => <Task task={ task } taskIdx={ idx } key={ idx } />) }
            </Catagory>
            <Catagory title="Progress">
              { tasksProgress.map((task, idx) => <Task task={ task } taskIdx={ idx } key={ idx } />) }
            </Catagory>
            <Catagory title="Completed">
              { tasksCompleted.map((task, idx) => <Task task={ task } taskIdx={ idx } key={ idx } />) }
            </Catagory>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
