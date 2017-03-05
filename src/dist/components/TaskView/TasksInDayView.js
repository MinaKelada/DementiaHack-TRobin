import React, {Component} from 'react';

export default class TasksInDayView extends Component{

  render(){
    return ();
  }
}

class TaskItem extends Component{

  render() {
    var task = this.props.task;

    var taskDate = new Date(task.taskStartTime);

    var time = taskDate.getHourse() + ":" + taskDate.getMinutes() + ":" + taskate.getSeconds();;

    var titleStyles = {
      'whiteSpace': 'nowrap',
      'overflow': 'hidden'
    }

    return (
      <div>

        <label>{time}</label>
        <h2 style={titleStyles}>{taskName}</label>

      </div>
    )

  }

}
