import React from 'react';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as tagActions from '../actions/actionCreators';
import CompareUnitDetails from './CompareUnitDetails';
import RemoveUnit from './RemoveUnit';
import { assignUnitToToken, removeUnitFromToken, removeFromFolio } from '../actions/actionCreators'
import { lightingControl } from './LightingControls';
import { getLightingId, getAssets, getFloorplan } from './AssetManager';
import { sendCommand, assetSelection } from './MessageHandler';

class CompareUnits extends React.Component {
  constructor(props){
    super(props);
    // this.removeUnitAp1 = this.removeUnitAp1.bind(this);
    // this.removeUnitAp2 = this.removeUnitAp2.bind(this);
    this.sendMessageToCMS = this.sendMessageToCMS.bind(this);
    this.sendMessageLEDLighting = this.sendMessageLEDLighting.bind(this);

    this.state = {
      residences: {}
    }
  }

  componentDidMount(){
    this.setState({
      residences: this.props.residences.data
    }, function(){
      // console.log('finished storing residence data in state');
      this.sendMessageToCMS();
    });

    this.sendMessageLEDLighting();
  }

  sendMessageToCMS(){
    var ap1Message = new assetSelection();
    var ap1Floorplan = getFloorplan(this.props.folio.ap1);
    ap1Message.params.url = ap1Floorplan;
    ap1Message.command = 'image';
    ap1Message.params.canvas = 'left';

    var ap2Message = new assetSelection();
    var ap2Floorplan = getFloorplan(this.props.folio.ap2);
    ap2Message.params.url = ap2Floorplan;
    ap2Message.command = 'image';
    ap2Message.params.canvas = 'right';

    //send both commands for compare mode
    sendCommand(ap1Message);
    sendCommand(ap2Message);
  }

  sendMessageLEDLighting(){
    var led_id_unit1 = getLightingId(this.props.folio.ap1);
    var led_id_unit2 = getLightingId(this.props.folio.ap2);

    console.log(`COMPARE MODE: ap1: ${this.props.folio.ap1}, LED ON: ${led_id_unit1} || ap2: ${this.props.folio.ap2}, LED ON: ${led_id_unit2}`);
    lightingControl(led_id_unit1, true);
    lightingControl(led_id_unit2, true);
  }

  getUnitId(token){
    const unitId = this.props.folio[token];
    return unitId;
  }

  // removeUnitAp1(){
  //   console.log('remove from Ap1');
  //   removeFromFolio('ap1');
  // }
  //
  // removeUnitAp2(){
  //   console.log('remove from Ap2');
  //   removeFromFolio('ap2');
  // }

  render(){
    return(
      <div className='view'>
        <div className='compare-container'>
          <div className='compare-division-line'></div>
          <CompareUnitDetails
            tag='ap1'
            unitId={this.getUnitId('ap1')}
            lastPath='/ap1'
          />
          <CompareUnitDetails
            tag='ap2'
            unitId={this.getUnitId('ap2')}
            lastPath='/ap2'
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    folio: state.folio,
    residences: state.assets.residences,
    media: state.assets.media
  }
}

function mapDispatchToProps(dispatch){
  return {
    tagActions: bindActionCreators(tagActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareUnits)
