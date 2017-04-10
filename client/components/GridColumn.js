import React from 'react'

import GridUnit from './GridUnit'

class GridColumn extends React.Component {
  constructor(){
    super();
  }

  createUnit(beds){
    return(
      <GridUnit key={beds} name={beds} interactive={true}/>
    )
  }

  createUnits(list){
    return list.map(this.createUnit);
  }

  render(){
    return(
      <div className='grid-column'>
        {this.createUnits(this.props.data)}
        // <GridUnit key={this.props.name} name={this.props.name} interactive={false}/>
        // {this.createUnits(this.props.data.units_available)}
      </div>
    )
  }
}

GridColumn.propTypes = {
  name: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired
}

export default GridColumn;
