import React, {Component} from 'react';

export default class SearchSettings extends Component{

    //TODO: text field pulls list of attributes
    //TODO: slider used for distance gathering
    //TODO: update information of parent component (parent updates on child state change)

  render(){
    return(
      <div className="searchSettings">
        <input type="text"/>
        <input type="submit"/>
      </div>
    )
  }
}
