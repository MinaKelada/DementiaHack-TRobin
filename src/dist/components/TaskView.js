import React, {Component} from 'react';
import PersonalInfo from './TaskView/PersonalInfo';
import TaskDetails from './TaskView/PersonalInfo';
import TaskLog from './TaskView/PersonalInfo';
import TasksInDayView from './TaskView/PersonalInfo';

var http = require("http");

export default class TaskView extends Component{

  componentDidMount() {

    var taskId = this.props.location.query.taskId;

    //TODO get task object from server by taskid


  }

  render() {
    return (
      <TasksInDayView/>
      <PersonalInfo/>
      <TaskDetails/>
      <TaskLog/>
    )
  }
}
