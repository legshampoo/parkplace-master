import React from 'react';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as tagActions from '../actions/actionCreators';
import CompareUnitDetails from './CompareUnitDetails';
import RemoveUnit from './RemoveUnit';
import { assignUnitToToken, removeUnitFromToken, removeFromFolio } from '../actions/actionCreators'
import { lightingControl } from './LightingControls';
import { getLightingId } from './AssetManager';
import { sendCommand, compareMode } from './MessageHandler';

class CompareUnits extends React.Component {
  constructor(){
    super();
    this.removeUnitAp1 = this.removeUnitAp1.bind(this);
    this.removeUnitAp2 = this.removeUnitAp2.bind(this);

    this.sendMessageToCMS = this.sendMessageToCMS.bind(this);
    this.sendMessageLEDLighting = this.sendMessageLEDLighting.bind(this);
  }

  componentDidMount(){

    this.sendMessageToCMS();
    this.sendMessageLEDLighting();

  }

  sendMessageToCMS(){
    var message = compareMode;
    message.params.unit1 = this.props.folio.ap1;
    message.params.unit2 = this.props.folio.ap2;

    sendCommand(message);
  }

  sendMessageLEDLighting(){
    var led_id_unit1 = getLightingId(this.props.folio.ap1);
    var led_id_unit2 = getLightingId(this.props.folio.ap2);

    lightingControl(led_id_unit1, true);
    lightingControl(led_id_unit2, true);
  }

  getUnitId(token){
    const unitId = this.props.folio[token];
    return unitId;
  }

  removeUnitAp1(){
    console.log('remove from Ap1');
    // removeUnitFromToken('ap1', this.props.folio['ap1']);
    removeFromFolio('ap1');
  }

  removeUnitAp2(){
    console.log('remove from Ap2');
    removeFromFolio('ap2');
  }

  render(){
    return(
      <div className='view'>
        <div className='compare-container'>
          <div className='compare-division-line'></div>
          <CompareUnitDetails tag='ap1' unitId={this.getUnitId('ap1')} lastPath='/ap1'/>
          <CompareUnitDetails tag='ap2' unitId={this.getUnitId('ap2')} lastPath='/ap2'/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    folio: state.folio
  }
}

function mapDispatchToProps(dispatch){
  return {
    tagActions: bindActionCreators(tagActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareUnits)
