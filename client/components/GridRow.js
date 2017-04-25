import React from 'react';
import PropTypes from 'prop-types';

import sample_data from '../data/residence.json';
import GridUnit from './GridUnit';

class GridRow extends React.Component {
  constructor(){
    super();
  }

  createUnit(unit){
    return(
      <GridUnit key={unit} name={unit} interactive={true}/>
    )
  }

  createUnits(type){
    var list = [];

    //get all of the units of the current type (# of bedrooms)
    Object.keys(sample_data).map(function(key){
      if(sample_data[key].bedrooms == type){
        list.push(sample_data[key].name);
      }
    });

    //to view 4 units per page
    var viewIndex = 0;
    var unitsToDisplay = 4;
    var currentList = list.slice(viewIndex, viewIndex + unitsToDisplay);

    return currentList.map(this.createUnit);
  }

  render(){
    return(
      <div className='grid-row'>
        <GridUnit key={this.props.name} name={this.props.rowName} interactive={false}/>
        {this.createUnits(this.props.type)}
      </div>
    )
  }
}

GridRow.propTypes = {
  rowName: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired
}

export default GridRow;
