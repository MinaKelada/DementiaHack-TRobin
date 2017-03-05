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
      port: 11038,
      path: "/api/caregiver/One?userId=58bb7b2d64a3a839e35341a5",
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }

    var req = http.request(httpOptions, (res) => {

      res.on('data', (data) => {
        var jsonData = JSON.parse(data);

        var mainPostal = jsonData.pcode;
        mainPostal = mainPostal.substr(0, 3) + " " + mainPostal.substr(3, 6);
        console.log(mainPostal);

        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': mainPostal
        }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            var myOptions = {
              zoom: 14,
              center: results[0].geometry.location,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map = new google.maps.Map(this.refs.map, myOptions);

            /*var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });*/


            var httpOptions = {
              host: "bolgarov.zapto.org",
              port: 11038,
              path: "/api/caregiver/filter?userId=58bb7b2d64a3a839e35341a5",
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
                  console.log(result);

                  var carePostal = result.pcode;
                  carePostal = carePostal.substr(0, 3) + " " + carePostal.substr(3, 6);

                  geocoder.geocode({
                    'address': carePostal
                  }, (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK){

                      var contentString = `
                      <div>
                        <h1> class="firstHeading">{result.first_name}</h1>
                        <div>
                          <p>DETAILS</p>
                          <p>
                            OTHER DETAILS
                            <a href="http://wikipedia.com">LINK</a>
                          </p>
                        </div>
                      </div>
                      `
                      var infowindow = new google.maps.InfoWindow({
                        content: contentString
                      });

                      var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: 'TITLE'
                      });
                      marker.addListener('click', () => {
                        infowindow.open(map, marker);
                      });
                    }
                  })

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

        });

      });
      res.on('end', () => {

      });

    });

    req.on('error', (error) =>  {
      console.error(error);
    });

    req.end();




    /*var httpOptions = {
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
          var jsondata = JSON.parse(data);
          console.log(jsondata);



        });
        res.on('end', () => {

        });

    });

    req.on('error', (error) =>  {
      console.error(error);
    });

    req.end();*/


  /*  let geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'postal_code':
    })*/


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
