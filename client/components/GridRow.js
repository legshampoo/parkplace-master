import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as folioActions from '../actions/actionCreators';

import GridUnit from './GridUnit';

class GridRow extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      residences: {}
    }
  }

  componentDidMount(){
    this.setState({ residences: this.props.residences.data });
  }

  createUnit(unit){
    return(
      <GridUnit key={unit} name={unit} interactive={true}/>
    )
  }

  createUnits(type){
    var list = [];
    var d = this.state.residences;
    //get all of the units of the current type (# of bedrooms)
    Object.keys(d).map(function(key){
      if(d[key].bedrooms == type){
        list.push(d[key].name);
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

export default connect(mapStateToProps, mapDispatchToProps)(GridRow);
