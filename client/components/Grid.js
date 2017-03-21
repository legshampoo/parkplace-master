import React from 'react'
import data from '../data/grid.json'

import GridRow from './GridRow'
import NavButton from './NavButton'
import ViewTitle from './ViewTitle'
import AddToFolioButton from './AddToFolioButton'

class Grid extends React.Component {
  constructor(){
    super();
  }

  createRow(row){
    return(
      <GridRow key={row.name} data={row} name={row.name} />
    )
  }

  createRows(rows){
    return rows.map(this.createRow);
  }

  render(){
    return(
      <div className='view'>
        {/* <ViewTitle title='AP' subtitle='APARTMENTS' /> */}
        <NavButton styleClass='nav-grid-to-keypad' name='KEYPAD OPTION' path='/keypad' />
        <div className='grid-wrapper'>
          <span className ='grid-border-overlay'></span>
          <span className = 'grid-vertical-overlay'></span>
          {this.createRows(data.unit_types)}
        </div>
      </div>
    )
  }
}

export default Grid;
