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
      currentEditIdx: -1,
      currentEditCatagory: '',
      modalVisible: false,
      editTask: {
        subject: '',
        info: '',
        catagory: 'all'
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
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.handleChangeInfo = this.handleChangeInfo.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChanegeCatagory = this.handleChanegeCatagory.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropOnBin = this.handleDropOnBin.bind(this);
  }

  componentDidMount() {
    // Retrieve the local data if any
    // Our state by default contains some dummy data
    // If local storage has data, replace them those data
    let localStorage = window.localStorage;
    let tasks = localStorage.getItem('tasks');
    if(tasks && tasks !== '[]' && tasks.length > 0) {
      this.setState({
        tasks: JSON.parse(tasks)
      });
    } else {
      // Insert the dummy data in local storage
      this.saveData();
    }

    // componentWillUnmount is not getting chance to unmount when reloading a page
    // So using window beforeunload event to trigger the function to save data to local storage
    window.addEventListener('beforeunload', this.saveData);
  }

  // Saves data to local storage
  saveData = () => {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  // componentWillUnmount() {
  //   // Save current tasks data to local storage
  //   localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  // }

  // Add new task or edit task? 
  // Values: edit, new
  operationType = 'new';

  // Toggles modal visibilty
  toggleModalVisible() {
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
        subject: e.target.value,
        catagory: this.state.editTask.catagory
      }
    });
  }

  // Handles change of info field
  handleChangeInfo(e) {
    this.setState({
      editTask: {
        subject: this.state.editTask.subject,
        info: e.target.value,
        catagory: this.state.editTask.catagory
      }
    });
  }

  // Handles change of catagory field
  handleChanegeCatagory(e) {
    this.setState({
      editTask: {
        subject: this.state.editTask.subject,
        info: this.state.editTask.info,
        catagory: e.target.value
      }
    });
  }

  // Edits a task
  editTask(idx, catagory) {
    let tasks = [...this.state.tasks];
    let taskToBeEdited = {
      subject: '',
      info: '',
      catagory: 'all'
    };
    let i = 0;
    for(let m = 0; m < tasks.length; m++) {
      if(catagory === tasks[m].catagory && idx === i) {
        taskToBeEdited.subject = tasks[m].subject;
        taskToBeEdited.info = tasks[m].info;
        taskToBeEdited.catagory = tasks[m].catagory;
        break;
      } else if(catagory === tasks[m].catagory) i++;
    }

    this.setState({
      editTask: {...taskToBeEdited},
      currentEditIdx: idx,
      currentEditCatagory: catagory
    });
  }

  // Updates an old task 
  updateTask(toCatagory, toggleModal = true) {
    let idx = this.state.currentEditIdx;
    let catagory = this.state.currentEditCatagory;

    let tasks = [...this.state.tasks];
    let i = 0;
    for(let m = 0; m < tasks.length; m++) {
      if(catagory === tasks[m].catagory && i === idx) {
        tasks[m].subject = this.state.editTask.subject;
        tasks[m].info = this.state.editTask.info;
        // If toCatagory is not provided its value is assigned as synthetic event class type.
        // Didn't find a fix. So explicitly checking its data type.
        tasks[m].catagory = typeof toCatagory === 'string' ? toCatagory : catagory;
        break;
      } else if(catagory === tasks[m].catagory) i++;
    }
    this.setState({ tasks }, () => {
      if(toggleModal) this.toggleModalVisible();
    });
  }

  // Adds a new task
  addTask() {
    // Subject should not be empty
    if(this.state.editTask.subject === '') return;

    this.setState((prevState) => {
      // Create new task object from recently edited task
      // Creation date-time: current date-time
      let newTask = {
        ...prevState.editTask,
        creationDate: new Date()
      };

      // Current tasks
      let tasks = prevState.tasks;

      // Push the new task
      tasks.push(newTask);

      // Reset the editTask values
      let newEditTask = {
        subject: '',
        info: '',
        catagory: 'all'
      }

      return { tasks, editTask: newEditTask };
    }, this.toggleModalVisible);
  }

  // Deletes a task
  deleteTask(idx, catagory) {
    this.setState((prevState) => {
      // Current tasks
      let tasks = [...prevState.tasks ];
      // Filter out the required task
      let i = 0;
      let newTasks = tasks.filter((task) => {
        if(task.catagory === catagory && idx === i) {
          i++;
          return false;
        }
        else if(task.catagory === catagory) i++;
        return true; 
      });

      return { tasks: newTasks };
    });
  }

  // Handles dragging task cards
  handleDragOver(prevCatagory, e) {
    e.preventDefault();
  }

  // Handles dropping of a dragged item
  handleDrop(catagory) {
    this.updateTask(catagory, false);
  }

  // Stores dragging item's data into state for persistency
  handleDragStart(idx, catagory) {
    let taskDragging = {};
    let tasks = [...this.state.tasks];
    let i = 0;
    for(let m = 0; m < tasks.length; m++) {
      if(tasks[m].catagory ===  catagory && i === idx) {
        taskDragging.subject = tasks[m].subject;
        taskDragging.info = tasks[m].info;
        taskDragging.creationDate = tasks[m].creationDate;
        break;
      } else if(tasks[m].catagory === catagory) i++;
    }

    this.setState({
      currentEditIdx: idx,
      currentEditCatagory: catagory,
      editTask: { ...taskDragging }
    });
  }

  // Handle drop task card upon the bin icon
  handleDropOnBin() {
    this.deleteTask(this.state.currentEditIdx, this.state.currentEditCatagory);
  }

  render() {
    // Filter out tasks based on their catagories
    let tasksAll = this.state.tasks.filter((task) => task.catagory === 'all');
    let tasksTodo = this.state.tasks.filter((task) => task.catagory === 'todo');
    let tasksProgress = this.state.tasks.filter((task) => task.catagory === 'progress');
    let tasksCompleted = this.state.tasks.filter((task) => task.catagory === 'completed');

    if(this.state.tasks.length > 0) return (
      <div>
        <TaskEditor 
          visible={ this.state.modalVisible } 
          close={ this.toggleModalVisible } 
          operationType={ this.operationType } 
          subjectChanged={ this.handleChangeSubject } 
          infoChanged={ this.handleChangeInfo }
          catagoryChanged = { this.handleChanegeCatagory } 
          addNew={ this.addTask } 
          update={ this.updateTask } 
          subject={ this.state.editTask.subject } 
          info={ this.state.editTask.info }
          catagory={ this.state.editTask.catagory } />

        <div className="container app">
          
          <button type="button" className="btn-custom btn-add" onClick={ () => {
            this.operationType = 'new';
            this.toggleModalVisible();
          } }> <img src={ logo_add } alt="Add button logo" />
          </button>

          <div className="btn-custom btn-bin" onDragOver={ (e) => this.handleDragOver('', e) } onDrop={ this.handleDropOnBin } >
            <img src={ logo_bin } alt="Bin button logo" />
          </div>

          <div className="title">
            <h1 className="text-center">Week Plannar</h1>
          </div>
    
          <div className="row">
            <Catagory 
              title="All" 
              dragOvered={ (e) => this.handleDragOver('all', e) }
              dragDropped={ () => this.handleDrop('all') }>
              { 
                tasksAll.map((task, idx) => <Task 
                task={ task } 
                taskIdx={ idx } 
                key={ idx }
                clickedEdit={ () => {
                  this.operationType = 'edit';
                  this.toggleModalVisible();
                  this.editTask(idx, 'all');
                  }
                }
                clickedRemove = { () => this.deleteTask(idx, 'all') }
                dragStarted={ () => this.handleDragStart(idx, 'all') } />) }
            </Catagory>

            <Catagory 
              title="To Do" 
              dragOvered={ (e) => this.handleDragOver('todo', e) }
              dragDropped={ () => this.handleDrop('todo') }>
              { 
                tasksTodo.map((task, idx) => <Task 
                task={ task } 
                taskIdx={ idx } 
                key={ idx }
                clickedEdit={ () => {
                  this.operationType = 'edit';
                  this.toggleModalVisible();
                  this.editTask(idx, 'todo');
                }}
                clickedRemove = { () => this.deleteTask(idx, 'todo') }
                dragStarted={ () => this.handleDragStart(idx, 'todo') } />) }
            </Catagory>

            <Catagory 
              title="Progress" 
              dragOvered={ (e) => this.handleDragOver('progress', e) }
              dragDropped={ () => this.handleDrop('progress') }>
              { 
                tasksProgress.map((task, idx) => <Task 
                task={ task } 
                taskIdx={ idx } 
                key={ idx }
                clickedEdit={ () => {
                  this.operationType = 'edit';
                  this.toggleModalVisible();
                  this.editTask(idx, 'progress');
                }}
                clickedRemove = { () => this.deleteTask(idx, 'progress') }
                dragStarted={ () => this.handleDragStart(idx, 'progress') } />) }
            </Catagory>

            <Catagory 
              title="Completed" 
              dragOvered={ (e) => this.handleDragOver('completed', e) }
              dragDropped={ () => this.handleDrop('completed') }>
              { tasksCompleted.map((task, idx) => <Task 
                task={ task } 
                taskIdx={ idx } 
                key={ idx }
                clickedEdit={ () => {
                  this.operationType = 'edit';
                  this.toggleModalVisible();
                  this.editTask(idx, 'completed');
                }}
                clickedRemove = { () => this.deleteTask(idx, 'completed') }
                dragStarted={ () => this.handleDragStart(idx, 'completed') }  />) }
            </Catagory>
          </div>
        </div>
      </div>
    );
    else return (<div></div>);
  }
};

export default App;
