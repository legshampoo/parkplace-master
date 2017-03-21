import React from 'react';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextLink from './TextLink';
import AddToFolioButton from './AddToFolioButton';
import ViewHeader from './ViewHeader';
import NextPageButton from './NextPageButton';
import RemoveUnit from './RemoveUnit';
import AssignToTokenButton from './AssignToTokenButton';

import * as folioActions from '../actions/actionCreators';
import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';

class UnitDetails extends React.Component {
  constructor(){
    super();
    this.assignToToken = this.assignToToken.bind(this);
    this.removeUnit = this.removeUnit.bind(this);
  }

  getUnitId(){
    const unitId = this.props.current.currentUnit;
    return unitId;
  }

  assignToToken(d){
    // console.log(d);
    console.log('assign unit to token');
    //get state of currentTag
    const currentTag = this.props.current.currentTag;
    const currentUnit = this.props.current.currentUnit;
    console.log(currentTag);
    console.log(currentUnit);
    //get state of currentUnit

    assignUnitToToken(currentTag, currentUnit);
  }

  removeUnit(d){
    console.log('remove');
    updateCurrentUnit('');
    this.context.router.goBack();
  }

  render(){
    return(
      <div className='view'>
        <div className='link-container'>
          <div className='link-container-border'></div>
          <TextLink path='/filler' displayText='FLOORPLAN' allowAddToFolio={true}/>
          <TextLink path='/filler' displayText='VIEW' allowAddToFolio={true}/>
          <TextLink path='/filler' displayText='KITCHEN' allowAddToFolio={true}/>
          <TextLink path='/filler' displayText='LIVING ROOM' allowAddToFolio={true}/>
          <TextLink path='/filler' displayText='MASTER BEDROOM' allowAddToFolio={true}/>
          <TextLink path='/filler' displayText='MASTER BATHROOM' allowAddToFolio={true}/>
        </div>
        <ViewHeader unitId={this.getUnitId()}/>
        <RemoveUnit styleClass='remove-unit-button-left' onClick={this.removeUnit.bind(this)}/>
        <NextPageButton />
        <AssignToTokenButton displayText={'ASSIGN'} onClick={this.assignToToken.bind(this)}/>
      </div>
    )
  }
}

UnitDetails.contextTypes = {
  router: React.PropTypes.object
}

UnitDetails.propTypes = {
  // assignUnit: React.PropTypes.func.isRequired,
  // unitId: React.PropTypes.string.isRequired
}

function mapStateToProps(state){
  return {
    folio: state.folio,
    current: state.current
  }
}

function mapDispatchToProps(dispatch){
  return {
    folioActions: bindActionCreators(folioActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitDetails)
