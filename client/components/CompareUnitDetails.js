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
import RemoveUnit from './RemoveUnit';
import { updateCurrentUnit, updateCurrentTag, assignUnitToToken } from '../actions/actionCreators';

class CompareUnitDetails extends React.Component {
  constructor(){
    super();
  }

  removeUnit(d){
    console.log(this.props.tag);

    const currentTag = this.props.tag;
    updateCurrentTag(this.props.tag);
    updateCurrentUnit('');
    assignUnitToToken(currentTag, '');
    var path = '/' + this.props.tag;
    this.context.router.push(path);
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
        <ViewHeader unitId={this.props.unitId}/>
        <UnitInfo />
        <RemoveUnit
          styleClass='remove-unit-button-compare'
          onClick={this.removeUnit.bind(this)}
        />
      </div>
    )
  }
}

CompareUnitDetails.contextTypes = {
  router: React.PropTypes.object
}

CompareUnitDetails.propTypes = {
  unitId: React.PropTypes.string.isRequired,
  tag: React.PropTypes.string.isRequired,
  lastPath: React.PropTypes.string.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(CompareUnitDetails);
