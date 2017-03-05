import React, {Component} from 'react';

var http = require("http");

export default class TasksInDayView extends Component{

  constructor(props) {
    super(props);

    this.state = {
      tasks: null
    }
  }

  componentDidMount() {

    var day = this.props.date;
    var teamId = this.props.teamId;

    console.log("in dayview");
    console.log(day);
    console.log(teamId);

    var httpOptions = {
      host: "bolgarov.zapto.org",
      port: 11030,
      path: "/api/task/getDay?day="+day+"&teamId="+teamId,
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }
    var req = http.request(httpOptions, (res) => {

      res.on('data', (data) => {
        var jsonData = JSON.parse(data);
        //console.log(jsonData);

        console.log(jsonData);
        this.setState({
          tasks: jsonData
        });



      });
      res.on('end', () => {

      });

    });

    req.on('error', (error) =>  {
      console.error(error);
    });

    req.end();

  }
  //TODO: get all tasks for day and team

  //TODO for each task, create a taskitem`



  render(){
    if (this.state.tasks){
      return (
        <div className="tasksInDayView">
          {
            this.state.tasks.forEach((result) => {
              <TaskItem task={result}/>
            })
          }
        </div>
      )
    } else {
      return (
        <div className="tasksInDayView">
          Loading..
        </div>
      )
    }
  }
}

class TaskItem extends Component{

  render() {
    var task = this.props.task;

    var taskDate = new Date(task.taskStartTime);

    var time = taskDate.getHours() + ":" + taskDate.getMinutes() + ":" + taskate.getSeconds();;

    var titleStyles = {
      'whiteSpace': 'nowrap',
      'overflow': 'hidden'
    }

    return (
      <div>

        <label>{time}</label>
        <h2 style={titleStyles}>{taskName}</h2>

      </div>
    )

  }

}
