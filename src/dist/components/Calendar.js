import React, {Component} from 'react';

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
      port: 11038,
      path: "/api/task/Weekly?teamId=2",
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

          tasks.push({
            events: [
              {
                title: result.taskName,
                start: result.taskStartTime,
                end: result.taskEndTime,
                dow: [0,1,2,3,4,5,6]
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
        eventSources: this.props.events
      });

    console.log("test2");

    return (
      <div ref="calendar"></div>
    );

  }
}
