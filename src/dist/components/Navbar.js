import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Navbar extends Component{

  constructor(props) {
    super(props);


  }

  render(){

    var navbarStyle = {
      'height': 'auto'
    }

    var imgStyle = {
      'height': 'auto',
      'width': 'auto',
      'display': 'block',
      'float': 'left'
    }

    var ulStyle = {
      'listStyle': 'none',
      'margin': '0',
      'padding': '0',
      'overflow': 'hidden'
    }

    var liStyle = {
      'float': 'right'
    }

    var linkStyle = {
      'display': 'block',
      'textAlign': 'center',
      'padding': '16px',
      'textDecoration': 'none'
    }

    return(
      <div className="navbar" style={navbarStyle}>
        <img className="logoIcon" style={imgStyle}/>
        <ul style={ulStyle}>
          <li style={liStyle}><Link style={linkStyle} to="/searchMap">Map</Link></li>
          <li style={liStyle}><Link style={linkStyle} to="/Calendar">Calendar</Link></li>
        </ul>
      </div>
    );

  }
}
