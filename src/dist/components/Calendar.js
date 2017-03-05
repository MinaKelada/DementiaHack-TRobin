import React, {Component} from 'react';
import {hashHistory} from 'react-router';

var http = require("http");

export default class CalendarContainer extends Component{

  constructor(props) {
    super(props)

    this.state = {
      taskList: []
    }
  }

  componentDidMount() {

    const colorList = [
      {color: '#bdb6fa', textColor: '#000000'},
      {color: '#fadfb6', textColor: '#000000'},
      {color: '#d1fab6', textColor: '#000000'},
      {color: '#dfb6fa', textColor: '#000000'},
      {color: '#b6d1fa', textColor: '#000000'},
      {color: '#fab6f3', textColor: '#000000'},
      {color: '#b6f3fa', textColor: '#000000'},
      {color: '#fabdb6', textColor: '#000000'},
      {color: '#e7f56e', textColor: '#000000'},
    ]

    var tasks = []

    //TODO: get tasks from database
    // assuming you obtained teamid from your own profile
    var httpOptions = {
      host: "bolgarov.zapto.org",
      port: 11030,
      path: "/api/task/",
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }

    var req = http.request(httpOptions, (res) => {

      res.on('data', (data) => {
        var jsonData = JSON.parse(data);

        console.log(jsonData);
        jsonData.forEach((result) => {
          //console.log(result);

          var startDate = new Date(result.taskStartTime);

          var currentColor = colorList[Math.floor(Math.random() * colorList.length)];

          console.log(result);

          var dow = null;
          if (result.recurring){
            if (result.recurring == "Daily"){
              dow = [0, 1, 2, 3, 4, 5, 6]
            } else if (result.recurring == "Weekly"){
              dow = [startDate.getDate()]
            }
          }

          tasks.push({
            events: [
              {
                title: result.taskName,
                start: result.taskStartTime,
                end: result.taskEndTime,
                taskId: result._id,
                dow: dow,
                //url: "/taskView?taskId=" + result._id + "&date="
              }
            ],
            color: currentColor.color,
            textColor: currentColor.textColor
          });

        });

        this.setState({
          taskList: tasks
        });

        this.render();

        console.log(tasks);

      });
      res.on('end', () => {

      });

    });

    req.on('error', (error) =>  {
      console.error(error);
    });

    req.end();
  }

  render(){
    console.log("test");
    return (
      <div>
        <Calendar events={this.state.taskList}/>
      </div>
    )
  }
}

class Calendar extends Component {

  componentDidMount() {
  }

  render(){


      const {calendar} = this.refs;

      console.log(this.props.events);

      $(calendar).fullCalendar({
        eventLimit: 3,
        eventSources: this.props.events,

        eventClick: (calEvent, jsEvent, view) => {
          var date = calEvent.start
          console.log("calevent: ");
          console.log(calEvent.taskId);
          console.log(calEvent._start._d.toISOString());
          console.log("jsEvent");
          console.log(jsEvent);

          var taskId = calEvent.taskId;
          var isoString = calEvent._start._d.toISOString();
          hashHistory.push('/TaskView?taskId=' + taskId + '&date=' + isoString);
        }
      });

    console.log("test2");

    return (
      <div ref="calendar"></div>
    );

  }
}
