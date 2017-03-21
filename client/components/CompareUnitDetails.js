import React from 'react';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as folioActions from '../actions/actionCreators';
import { removeFromFolio } from '../actions/actionCreators';

import ViewHeader from './ViewHeader';
import TextLink from './TextLink';
import GenericButton from './GenericButton';
import UnitInfo from './UnitInfo';
import AddToFolioButton from './AddToFolioButton';

class CompareUnitDetails extends React.Component {
  constructor(){
    super();
    this.removeApartment = this.removeApartment.bind(this);
  }

  removeApartment(){
    // console.log('remove:', this.props.unitId);
    // const getUnitApartment = localStorage.getItem(this.props.token);
    // console.log('remove: ', getUnitApartment);
    // localStorage.removeItem(this.props.token);
    // this.context.router.push(this.props.lastPath);

    // const getUnit = this.props.unitId;
    const tag = this.props.token;
    // removeFromFolio(tag);
    removeFromFolio(tag);
    this.context.router.push(this.props.lastPath);

  }

  render(){
    return(
      <div className='compare-unit-wrapper'>
        <div className='add-to-folio-wrapper-compare'>
          <AddToFolioButton styleClass='add-to-folio-button-compare' />
        </div>
        <div className='compare-unit-header'>
          <h1>FLOORPLAN</h1>
        </div>
        <div className='compare-unit-sub-header'>
          <h2>DETAILS</h2>
        </div>
        {/* <GenericButton styleClass='remove-apartment-button' action={this.removeApartment} textDisplay='X' /> */}
        <ViewHeader unitId={this.props.unitId}/>
        <UnitInfo />
        {/* <div className='compare-unit-link-wrapper'>
        </div> */}

      </div>
    )
  }
}

CompareUnitDetails.contextTypes = {
  router: React.PropTypes.object
}

CompareUnitDetails.propTypes = {
  unitId: React.PropTypes.string.isRequired,
  token: React.PropTypes.string.isRequired,
  lastPath: React.PropTypes.string.isRequired
}

function mapStateToProps(state){
  return {
    folio: state.folio
  }
}

function mapDispatchToProps(dispatch){
  return {
    folioActions: bindActionCreators(folioActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareUnitDetails);
