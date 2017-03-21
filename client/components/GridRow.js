import React from 'react'

import GridUnit from './GridUnit'

class GridRow extends React.Component {
  constructor(){
    super();
  }

  createUnit(unit){
    return(
      <GridUnit key={unit} name={unit} interactive={true}/>
    )
  }

  createUnits(units){
    return units.map(this.createUnit);
  }

  render(){
    return(
      <div className='grid-row'>
        <GridUnit key={this.props.name} name={this.props.name} interactive={false}/>
        {this.createUnits(this.props.data.units_available)}
      </div>
    )
  }
}

GridRow.propTypes = {
  data: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired
}

export default GridRow;
