import React from 'react'

import { updateCurrentUnit } from '../actions/actionCreators';

class GridUnit extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(event){
    event.preventDefault();
    var path = '/unit-details/' + this.props.name;

    if(this.props.interactive){
      updateCurrentUnit(this.props.name);
      this.context.router.push(path);
    }else{
      return;
    }
  }

  render(){
    return(
      <button className='grid-unit' onClick={(e) => this.onClick(e)}>
        <h1>{this.props.name}</h1>
      </button>
    )
  }
}

GridUnit.contextTypes = {
  router: React.PropTypes.object
}

GridUnit.propTypes = {
  name: React.PropTypes.string.isRequired,
  interactive: React.PropTypes.bool.isRequired
}

export default GridUnit;
