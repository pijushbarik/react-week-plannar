import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Catagory from './catagory/catagory';
import Task from './task/task';
import TaskEditor from './task-editor/task-editor';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          subject: 'Lorem ipsum',
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
  }

  render() {
    // Filter out tasks based on their catagories
    let tasksAll = this.state.tasks.filter((task) => task.catagory === 'all');
    let tasksTodo = this.state.tasks.filter((task) => task.catagory === 'todo');
    let tasksProgress = this.state.tasks.filter((task) => task.catagory === 'progress');
    let tasksCompleted = this.state.tasks.filter((task) => task.catagory === 'completed');

    return (
      <div>
        <TaskEditor />
        <div className="container app">
          <div className="title">
            <h1 className="text-center">Week Plannar</h1>
          </div>
    
          <div className="row">
            <Catagory title="All">
              { tasksAll.map((task, idx) => <Task task={task} taskIdx={idx} key={idx} />) }
            </Catagory>
            <Catagory title="To Do">
              { tasksTodo.map((task, idx) => <Task task={task} taskIdx={idx} key={idx} />) }
            </Catagory>
            <Catagory title="Progress">
              { tasksProgress.map((task, idx) => <Task task={task} taskIdx={idx} key={idx} />) }
            </Catagory>
            <Catagory title="Completed">
              { tasksCompleted.map((task, idx) => <Task task={task} taskIdx={idx} key={idx} />) }
            </Catagory>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
