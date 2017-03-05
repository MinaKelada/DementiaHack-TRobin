import React, {Component} from 'react';

var http = require("http");

class Map extends Component{

  constructor(props) {
    super(props);

    this.state = {
      style: {
        height: '500px'
      }
    }
  }

  componentDidMount() {
    console.log("test");

    var httpOptions = {
      host: "bolgarov.zapto.org",
      port: 11035,
      path: "/api/caregiver/filter?userId=58bb7b2d64a3a839e35341a5",
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }

    var req = http.request(httpOptions, (res) => {

        res.on('data', (data) => {
          console.log(data);
        });
        res.on('end', () => {

        });

    });

    req.on('error', (error) =>  {
      console.error(error);
    });

    req.end();

    let map = new google.maps.Map(this.refs.map, {
      center: {lat: -34, lng: 150},
      zoom: 8
    })
  }

  render() {

    return (
      <div ref="map" className="googleMap" style={this.state.style}>poop</div>
    )
  }
}


export default class GoogleMap extends Component{

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      caregiverList: []
    };
  }

  ComponentDidMount() {

  }

  render(){

    const {loaded} = this.state;

    let content = null;

    if(loaded){
      content = <div>Loaded</div>;
    } else {
      content = <div>Loading...</div>;
    }

    return (
      <div>
        <Map google={this.props.google} />
      </div>
    );

  }
}
