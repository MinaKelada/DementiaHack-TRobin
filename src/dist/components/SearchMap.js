import React, {Component} from 'react';
import GoogleMapComp from './SearchMap/GoogleMap';
import SearchSettings from './SearchMap/SearchSettings';

export default class SearchMap extends Component{
  ComponentDidMount() {
    //TODO: text field pulls list of attributes
    //TODO: slider used for distance gathering
  }

  render(){
    return(
      <div>
        <SearchSettings style={{'width': '48%', 'float': 'left'}}/>
        <GoogleMapComp style={{'width': '48%', 'float': 'left'}}/>
      </div>
    )
  }
}
