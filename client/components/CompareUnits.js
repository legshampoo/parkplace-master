import React from 'react';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as tagActions from '../actions/actionCreators';
import CompareUnitDetails from './CompareUnitDetails';
import RemoveUnit from './RemoveUnit';
import { assignUnitToToken, removeUnitFromToken, removeFromFolio } from '../actions/actionCreators'

class CompareUnits extends React.Component {
  constructor(){
    super();
    this.removeUnitAp1 = this.removeUnitAp1.bind(this);
    this.removeUnitAp2 = this.removeUnitAp2.bind(this);
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
          <div className='compare-border'></div>
          <div className='compare-division-line'></div>
          <CompareUnitDetails token='ap1' unitId={this.getUnitId('ap1')} lastPath='/ap1'/>
          <CompareUnitDetails token='ap2' unitId={this.getUnitId('ap2')} lastPath='/ap2'/>
          <RemoveUnit styleClass='remove-unit-button-left' onClick={this.removeUnitAp1.bind(this)}/>
          <RemoveUnit styleClass='remove-unit-button-right' onClick={this.removeUnitAp2.bind(this)}/>
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
