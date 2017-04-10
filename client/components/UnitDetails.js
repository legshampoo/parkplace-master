import React from 'react';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import data from '../data/data.json';
import dashboardData from '../data/controlPanelImage';
import store from '../store';

import TextLink from './TextLink';
import AddToFolioButton from './AddToFolioButton';
import ViewHeader from './ViewHeader';
import NextPageButton from './NextPageButton';
import RemoveUnit from './RemoveUnit';
import AssignToTokenButton from './AssignToTokenButton';
import ControlPanel from './ControlPanel';
import RenderAssets from './RenderAssets';

import * as folioActions from '../actions/actionCreators';
import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';

class UnitDetails extends React.Component {
  constructor(props){
    super(props);

    this.assignToToken = this.assignToToken.bind(this);
    this.removeUnit = this.removeUnit.bind(this);
    this.selectMedia = this.selectMedia.bind(this);

    // this.state = {
    //   selectedAsset: {},
    //   status: {}
    // }
    // this.state = {
    //   activeButton: {}
    // }
  }

  componentDidMount(){
    // this.state.status({
    //   asset_01: false,
    //   asset_02: false,
    //   asset_03: false
    // });
    // this.state.status.push({
    //   asset_01: false
    // })
    // var newState = [];
    // newState.push({
    //   'asset_01': false,
    //   'asset_02': false
    // });

    this.assignToToken();

  }

  shouldComponentUpdate(){
    console.log('should component update: false');
    return false;
  }

  getUnitId(){

    var unitId = this.props.current.currentUnit;
    console.log('unit: ' + unitId);

    //if unit is PHA or PHB, insert a 'space' char
    //so it will match with the data.json
    if(unitId == 'PHA' || unitId == 'PHB'){
      unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
    }

    return unitId;
  }

  assignToToken(d){
    console.log('assign unit to token');
    //get the current tag and current unit
    const currentTag = this.props.current.currentTag;
    const currentUnit = this.props.current.currentUnit;

    assignUnitToToken(currentTag, currentUnit);
  }

  removeUnit(d){
    console.log('remove unit from token');
    updateCurrentUnit('empty');
    const currentTag = this.props.current.currentTag;
    assignUnitToToken(currentTag, '');
    this.context.router.goBack();
  }

  renderAssets(d){
    var unit = this.getUnitId();
    var details = {};

    //check if the unit exists in d (data)
    try{
      Object.keys(d).map(function(key, index){
        if(d[key].name == unit){
          details = d[key];
          console.log('unit found');
        }
      });
    }catch(err){
      console.log('errrrrrr');
    }

    //check if the unit has media
    if (details.media){
      // return details.media.map(this.renderAsset);
      return(
        <RenderAssets handleClick={this.selectMedia} data={details.media} />
      )
    }else{
      console.log('no unit media, going back to keypad');
      if(store.getState().current.currentUnit == ''){
        console.log('no token found, go home');
        var path = '/';
        this.context.router.push(path);
      }else{
        console.log('token is still down, go to keypad');
        this.context.router.goBack();
      }
    }
  }

  selectMedia(media) {
    // console.log('textlink selected: ' + textLink);
    console.log(media);
  }

  // renderAsset(asset){
  //   var key = Math.random();
  //   // var key = asset.name;
  //   var displayText = asset.name.toUpperCase();
  //
  //   return (
  //     <RenderAssets />
  //     // <TextLink key={key} path={asset.pan} displayText={displayText} allowAddToFolio={false} />
  //   )
  // }


  render(){
    return(
      <div className='view'>
        <div className='link-container'>
          <div className='link-container-border'></div>
          {this.renderAssets(data)}
        </div>
        <ViewHeader unitId={this.getUnitId()} />
        <RemoveUnit handleClick={this.selectMedia} styleClass='remove-unit-button-center' onClick={this.removeUnit.bind(this)}/>
        <NextPageButton />
        <ControlPanel dashboardData={dashboardData} type='blank'/>
        <AssignToTokenButton displayText={'+'} onClick={this.assignToToken.bind(this)}/>
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
