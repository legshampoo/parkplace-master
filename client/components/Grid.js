import React from 'react'
import data from '../data/residence.json';

import GridRow from './GridRow'
import NavButton from './NavButton';

class Grid extends React.Component {
  constructor(){
    super();
    this.createRow = this.createRow.bind(this);
  }


  createRows(d){
    var unitTypes = [];

    //get all of the possible unit types (# of bedrooms)
    Object.keys(d).map(function(key){
      if(unitTypes.indexOf(d[key].bedrooms) == -1){
        unitTypes.push(d[key].bedrooms);
      }
    });

    unitTypes.sort();  //sort them into ascending order

    return unitTypes.map(this.createRow);

  }

  //take a unit type and create a row of available units
  createRow(type){
    var name = type.toString() + "BR";
    return(
      <GridRow key={name} rowName={name} type={type}/>
    )
  }

  render(){
    return(
      <div className='view'>
        <NavButton styleClass='nav-grid-to-keypad' name='KEYPAD OPTION' path='/keypad' />
        <div className='grid-wrapper'>
          <span className ='grid-border-overlay'></span>
          <span className = 'grid-vertical-overlay'></span>
          {this.createRows(data)}
        </div>
      </div>
    )
  }
}

export default Grid;
