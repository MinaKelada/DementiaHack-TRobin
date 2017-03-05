import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Navbar extends Component{
  render(){

    return(
      <div className="navbar">
        <ul>
          <li><Link to="/searchMap">Map</Link></li>
          <li><Link to="/Calendar">Calendar</Link></li>
        </ul>
      </div>
    );

  }
}
