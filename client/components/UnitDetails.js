import React from 'react';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import data from '../data/data.json';
// import dashboardData from '../data/controlPanelImage';
import store from '../store';

import TextLink from './TextLink';
import AddToFolioButton from './AddToFolioButton';
import ViewHeader from './ViewHeader';
import NextPageButton from './NextPageButton';
import RemoveUnit from './RemoveUnit';
import AssignToTokenButton from './AssignToTokenButton';
import ControlPanel from './ControlPanel';
import RenderAssets from './RenderAssets';
import TextLinkBorder from './TextLinkBorder';

import * as folioActions from '../actions/actionCreators';
import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';

class UnitDetails extends React.Component {
  constructor(props){
    super(props);

    this.assignToToken = this.assignToToken.bind(this);
    this.removeUnit = this.removeUnit.bind(this);
    this.selectMedia = this.selectMedia.bind(this);

    this.state = {
      mediaGroup: '',
      activeButton: {},
      selectedMediaType: '',
      pageIndex: 0
    }
  }

  componentDidMount(){
    this.assignToToken();

  }

  shouldComponentUpdate(){
    var shouldUpdate = true;
    return shouldUpdate;
  }

  getUnitId(){

    var unitId = this.props.current.currentUnit;
    // console.log('unit: ' + unitId);

    //if unit is PHA or PHB, insert a 'space' char
    //so it will match with the data.json
    if(unitId == 'PHA' || unitId == 'PHB'){
      unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
    }

    return unitId;
  }

  assignToToken(d){
    //get the current tag and current unit
    const currentTag = this.props.current.currentTag;
    const currentUnit = this.props.current.currentUnit;

    assignUnitToToken(currentTag, currentUnit);
  }

  removeUnit(d){
    console.log('remove unit from token');
    updateCurrentUnit('');
    const currentTag = this.props.current.currentTag;
    assignUnitToToken(currentTag, '');
    var path = currentTag;
    this.context.router.push(path);
  }

  checkUnitExists(d, unit){
    console.log(unit);
    var found = false;

    try{
      Object.keys(d).map(function(key, index){
        if(d[key].name == unit){
          found = true;
        }
      });
    }catch(err){
      console.log('errrrrrr');
    }

    return found;
  }

  getUnitData(d, unit){
    // console.log(unit);
    var unitData = {};

    try{
      Object.keys(d).map(function(key, index){
        if(d[key].name == unit){
          unitData = d[key];
        }
      });
    }catch(err){
      console.log('errrrrrr');
    }

    return unitData;
  }

  checkIfEmpty(obj){
    try{
      return Object.keys(obj).length === 0;
    }catch(e){
      return true;
    }
    return false;
  }

  renderAssets(d){
    var unit = this.getUnitId();

    var found = this.checkUnitExists(d, unit);

    if(found){
      var details = this.getUnitData(d, unit);
      console.log(details);
      var empty = this.checkIfEmpty(details.media);
      if(empty){
        console.log('no media found');
      }

      return(
        <RenderAssets pageIndex={this.state.pageIndex} handleClick={this.selectMedia} data={details.media} activeButton={this.state.activeButton} mediaType='photo' />
      )

    }else{
      console.log('unit ' + unit + ' not found');
      console.log('return to keypad');
      var path = this.props.current.currentTag;
      this.context.router.push(path);
      return;
    }
  }

  selectMedia(media, type) {
    var activeButton = this.state.activeButton;
    activeButton = media;

    var selectedMediaType = this.state.selectedMediaType;
    selectedMediaType = type;

    this.setState({
      activeButton: activeButton,
      selectedMediaType: selectedMediaType
    }, function(){
      console.log('active button: ' + activeButton.name);
      console.log('type: ' + selectedMediaType)
    });
  }

  renderControlPanel(){
    if(this.state.selectedMediaType === 'video'){
      console.log('vid');
      return(
         <ControlPanel type='video-controls' handleClick={this.sendControlMessage.bind(this)}/>
      )
    }
    if(this.state.selectedMediaType === 'photo'){
      return(
        <ControlPanel type='photo-controls' handleClick={this.sendControlMessage.bind(this)}/>
      )
    }
  }

  sendControlMessage(command){

    var msg = {
      'media-group': this.state.mediaGroup,
      'media': this.state.activeButton,
      'command': command
    }

    console.log('socket send:');
    console.log(msg);

  }

  render(){
    return(
      <div className='view'>
        <div className='media-assets-container'>
          <TextLinkBorder />
          <div className='media-container-border-overlay'></div>
          {this.renderAssets(data)}
        </div>
        <ViewHeader unitId={this.getUnitId()} />
        <RemoveUnit styleClass='remove-unit-button-center' onClick={this.removeUnit.bind(this)}/>
        <NextPageButton />
        {this.renderControlPanel()}
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
