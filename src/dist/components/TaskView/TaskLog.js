import React, {Component} from 'react';

export default class TaskLog extends Component{

  constructor(props) {
    super(props)

    this.state = {
      messages: this.props.messages
    }
  }

  componentDidMount(){

  }

  //TODO: for every message, create a message log

  render(){
    return (
      <div className="taskLog">
        <h2>messages displayed:</h2>
        {this.state.messages.forEach((result) => {
          <Log message={result}/>
        })}
      </div>
    );
  }
}

class Log extends Component{

  //TODO: with message, write log in location

  render() {

    return (
      <div className="messageLog">
        <p>message.</p>
      </div>
    )
  }

}
