import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import residence from '../data/residence.json';
import media from '../data/media.json';

import TextLink from './TextLink';
import TextLinkBorder from './TextLinkBorder';
import NextPageButton from './NextPageButton';
import ControlPanel from './ControlPanel';
import RenderAssets from './RenderAssets';
import RemoveUnit from './RemoveUnit';
import ViewHeader from './ViewHeader';
import * as folioActions from '../actions/actionCreators';
import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';
import { sendCommand, assetSelection, fitVertical } from './MessageHandler';
import { combineAssets, getUnitId, getAssets, checkUnitExists, checkIfEmpty, getLightingId } from './AssetManager';
import { lightingControl } from './LightingControls';

class Assets extends React.Component {
  constructor(props){
    super(props);

    this.assignToToken = this.assignToToken.bind(this);
    this.renderAssets = this.renderAssets.bind(this);
    this.selectMedia = this.selectMedia.bind(this);
    this.changePageIndex = this.changePageIndex.bind(this);
    this.renderRemoveUnitButton = this.renderRemoveUnitButton.bind(this);
    this.removeUnit = this.removeUnit.bind(this);
    this.renderControlPanel = this.renderControlPanel.bind(this);

    this.state = {
      previousTag: '',
      mediaGroup: '',
      selectedMedia: {},
      selectedMediaType: '',
      pageIndex: 0
    }
  }

  componentDidMount(){
    this.updateProps();
  }

  updateProps(){

    var mediaGroup = this.state.mediaGroup;
    var tag = this.props.current.currentTag;
    var led_id = 0;

    switch(tag){
      case 'ap1':
      case 'ap2':
      case 'PHA':
      case 'PHB':
        // console.log('tag: ' + tag);
        mediaGroup = 'Unit';

        var unit = this.props.current.currentUnit;
        console.log('unit: ' + unit);
        if(tag === 'PHA'){
          unit = 'PHA';
        }
        if(tag === 'PHB'){
          unit = 'PHB';
        }else{
          this.assignToToken();
        }

        led_id = getLightingId(unit);
        console.log('led_id: ' + led_id);
        //send request to LED lighting API
        lightingControl(led_id, true);

        break;
      case 'am':
        mediaGroup = 'Amenities';
        led_id = getLightingId(mediaGroup);
        // console.log('led_id: ' + led_id);
        lightingControl(led_id, true);
        break;
      case 'n':
        mediaGroup = 'Neighborhood';
        led_id = getLightingId(mediaGroup);
        // console.log('led_id: ' + led_id);
        lightingControl(led_id, true);
        break;
      case 't':
        mediaGroup = 'Team';
        led_id = getLightingId(mediaGroup);
        // console.log('led_id: ' + led_id);
        lightingControl(led_id, true);
        break;
      default:
        console.log('default');
        break;
    }

    if(this.state.mediaGroup !== mediaGroup) {
      this.setState({
        mediaGroup: mediaGroup,
        locationPathname: this.props.location.pathname
      }, function(){
        // console.log('media group set to ' + mediaGroup);
      });
    }
  }

  componentDidUpdate() {
    if(this.state.locationPathname !== this.props.location.pathname) {
      console.log(this.props.location, this.props.match)
      console.log('did update');
      this.updateProps();
    }
  }


  assignToToken(){
    const currentTag = this.props.current.currentTag;
    const currentUnit = this.props.current.currentUnit;

    assignUnitToToken(currentTag, currentUnit);
  }

  changePageIndex(val){
    var index = this.state.pageIndex + val;
    if(index < 0){
      index = 0;
    }

    var dataSet = {};
    if(this.state.mediaGroup === 'Unit' || this.state.mediaGroup === 'Unit_Penthouse'){
      var unit = getUnitId();
      dataSet = getAssets(residence, unit).media;
    }else{
      var d = getAssets(media, this.state.mediaGroup);
      dataSet = combineAssets(d, this.state.mediaGroup);
    }

    if((index + 1) > Math.ceil(dataSet.length / 6)){
      index = index - 1;
    }

    this.setState({pageIndex: index});
  }


  selectMedia(media, type){
    var msg = assetSelection;

    this.setState({
      selectedMedia: media,
      selectedMediaType: type
    }, function(){
      console.log('state updated');
    });

    if(type == 'photo'){
      msg.command = 'image'
    }
    if(type == 'video'){
      msg.command = 'video'
    }

    if(this.state.mediaGroup == 'Unit' || this.state.mediaGroup == 'Unit_Penthouse'){
      msg.params.url = media.full_screen;
    }else{
      msg.params.url = media.wall;
    }

    //send asset command to CMS
    sendCommand(msg);

    //send fit to height command to CMS as default way to display asset
    sendCommand(fitVertical)
  }

  renderControlPanel(){

    var controlType = '';

    if(this.state.selectedMediaType === 'video'){
      controlType = 'video-controls';
    }else if(this.state.selectedMediaType === 'photo'){
      controlType = 'photo-controls';
    }else{
      controlType = 'blank'
    }

    return(
      <ControlPanel
        type={controlType}
        mediaGroup={this.state.mediaGroup}
        selectedMedia={this.state.selectedMedia}
        handleClick={this.sendControlMessage.bind(this)}/>
    )

  }

  sendControlMessage(cmd){
    var command = cmd;
    var path = 'path';
    console.log('sending control panel command...');

    //send control panel command to CMS
    sendCommand(command);

  }

  renderAssets(d){
    var details = {};
    if(this.state.mediaGroup === 'Unit'){
      var unit = getUnitId();
      var found = checkUnitExists(d, unit);
      try{
        if(found){
          details = getAssets(d, unit);
        }
      }catch(e){
        console.log('error finding unit media');
      }
    }else{
      details = getAssets(d, this.state.mediaGroup);
    }


    var isEmpty = checkIfEmpty(details);
    if(!isEmpty){
      return (
        <RenderAssets
          pageIndex={this.state.pageIndex}
          handleClick={this.selectMedia}
          type={this.state.mediaGroup}
          data={details}
          selectedMedia={this.state.selectedMedia} />
      )
    }else{
      // console.log('empty array');
    }

  }

  removeUnit(d){
    console.log('remove unit from token');

    //turn off the LED lighting
    var unit = this.props.current.currentUnit;
    console.log('removing unit: ' + unit);
    var led_id = getLightingId(unit);
    //send command to turn LED lights off
    lightingControl(led_id, false);

    updateCurrentUnit('');
    const currentTag = this.props.current.currentTag;
    assignUnitToToken(currentTag, '');
    var path = currentTag;
    // this.context.router.push(path);
    this.context.router.goBack();
  }

  renderRemoveUnitButton(){
    if(this.props.current.currentTag == 'PHA' || this.props.current.currentTag == 'PHB'){
      return;
    }else{
      return(
        <RemoveUnit
          styleClass='remove-unit-button-center'
          onClick={this.removeUnit.bind(this)} />
      )
    }
  }

  render(){
    return(
      <div className='view'>
        <div className='media-assets-container'>
          <TextLinkBorder />
          <div className='media-container-border-overlay'></div>
          {this.state.mediaGroup === 'Unit' ? this.renderAssets(residence) : this.renderAssets(media)}
        </div>
        <ViewHeader unitId={this.state.mediaGroup == 'Unit' ? getUnitId() : this.state.mediaGroup} />
        {this.state.mediaGroup == 'Unit' ? this.renderRemoveUnitButton() : '' }
        <NextPageButton handleClick={this.changePageIndex} />
        {this.renderControlPanel()}
      </div>
    )
  }
}

Assets.contextTypes = {
  router: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(Assets);
