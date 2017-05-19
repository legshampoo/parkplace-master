import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as folioActions from '../actions/actionCreators';
import { removeFromFolio } from '../actions/actionCreators';

import ViewHeader from './ViewHeader';
import TextLink from './TextLink';
import GenericButton from './GenericButton';
import UnitInfo from './UnitInfo';
import AddToFolio from './AddToFolio';
import RemoveUnit from './RemoveUnit';
import { updateCurrentUnit, updateCurrentTag, assignUnitToToken } from '../actions/actionCreators';
import { lightingControl } from './LightingControls';
import { getLightingId } from './AssetManager';

class CompareUnitDetails extends React.Component {
  constructor(){
    super();
  }

  removeUnit(d){
    //turn off the LED for the unit we are removing
    var unitLED = this.props.unitId;
    var led_id = getLightingId(unitLED);

    if(led_id != 0){
      //send command to turn LED lights off
      console.log(`Removing Unit from ${this.props.tag}: ${unitLED} LED OFF: ${led_id}`);
      lightingControl(led_id, false);
    }

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
        <ViewHeader unitId={this.props.unitId}/>
        <div className='compare-unit-header'>
          FLOORPLAN
        </div>
        <div className='compare-unit-sub-header'>
          DETAILS
        </div>
        <UnitInfo unitId={this.props.unitId}/>
        <RemoveUnit
          styleClass='remove-unit-button-compare'
          onClick={this.removeUnit.bind(this)}
        />
      </div>
    )
  }
}

CompareUnitDetails.contextTypes = {
  router: PropTypes.object
}

CompareUnitDetails.propTypes = {
  unitId: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  lastPath: PropTypes.string.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(CompareUnitDetails);
