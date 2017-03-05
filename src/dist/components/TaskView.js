import React, {Component} from 'react';
import PersonalInfo from './TaskView/PersonalInfo';
import TaskDetails from './TaskView/TaskDetails';
import TaskLog from './TaskView/TaskLog';
import TasksInDayView from './TaskView/TasksInDayView';

var http = require("http");

export default class TaskView extends Component{

  constructor(props) {
    super(props);

    this.state = {
      date: null,
      caregiver: null,
      task: null,
      messages: null,
      teamId: null
    }
  }

  componentDidMount() {

    var taskId = this.props.location.query.taskId;
    var isoString = this.props.location.query.date;
    //console.log(taskId);


    //TODO get task object from server by taskid
    var httpOptions = {
      host: "bolgarov.zapto.org",
      port: 11030,
      path: "/api/task/One?taskId="+taskId,
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }

    var req = http.request(httpOptions, (res) => {

      res.on('data', (data) => {
        var jsonData = JSON.parse(data);

        //console.log(jsonData);

        var task = jsonData;
        this.setState({
          task: task
        });
        //console.log("task set");
        //console.log(task);

        var teamId = task.teamid;
        this.setState({
          teamId: teamId
        });
        //console.log("teamId set:");
        //console.log(teamId);

        var httpOptions = {
          host: "bolgarov.zapto.org",
          port: 11030,
          path: "/api/caregiver/One?userId="+task.assigneeId,
          method: "GET",
          headers: {
            'Accept': 'application/json'
          }
        }
        var req = http.request(httpOptions, (res) => {

          res.on('data', (data) => {
            var jsonData = JSON.parse(data);
            //console.log(jsonData);

            var caregiver = jsonData
            this.setState({
              caregiver: caregiver
            });
            //console.log("caregiver set");
            //console.log(caregiver);


          });
          res.on('end', () => {

          });

        });

        req.on('error', (error) =>  {
          console.error(error);
        });

        req.end();


        var messages = task.comments;
        this.setState({
          messages: messages
        });
        //console.log("messages set");
        //console.log(messages);

      });
      res.on('end', () => {

      });

    });

    req.on('error', (error) =>  {
      console.error(error);
    });

    req.end();

    //TODO  get the Date
    var date = isoString;
    this.setState({
      date: date
    });
    //console.log("date set");
    //console.log(date);
    //create TasksInDayView with specific date


    //TODO get caregiver object from task object's owner


    //TODO create PersonalInfo with caregiver object


    //TODO create TaskDetails with task object


    //TODO create TaskLog with task comments

  }

  render() {
    if (this.state.date && this.state.teamId && this.state.caregiver && this.state.messages && this.state.task){
      return (
        <div className="taskView">
          <TasksInDayView date={this.state.date} teamId={this.state.teamId}/>
          <PersonalInfo caregiver={this.state.caregiver}/>
          <TaskDetails task={this.state.task}/>
          <TaskLog messages={this.state.messages}/>
        </div>
      )
    } else {
      return(
        <div className="taskView">Loading...</div>
      )
    }

  }
}
