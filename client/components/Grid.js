import React from 'react'
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as folioActions from '../actions/actionCreators';
// import data from '../data/residence.json';

import GridRow from './GridRow'
import NavButton from './NavButton';

class Grid extends React.Component {
  constructor(){
    super();
    this.createRow = this.createRow.bind(this);

    this.state = {
      residences: {}
    }
  }

  componentDidMount(){
    this.setState({ residences: this.props.residences.data });
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
        <NavButton styleClass='nav-grid-to-keypad' name='KEYPAD' path='/keypad' />
        <div className='grid-wrapper'>
          <span className ='grid-border-overlay'></span>
          <span className = 'grid-vertical-overlay'></span>
          {this.createRows(this.state.residences)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    folio: state.folio,
    current: state.current,
    residences: state.assets.residences,
    media: state.assets.media
  }
}

function mapDispatchToProps(dispatch){
  return {
    folioActions: bindActionCreators(folioActions, dispatch)
  }
}

// export default Grid;
export default connect(mapStateToProps, mapDispatchToProps)(Grid);
