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
// import RenderNonUnitAssets from './RenderNonUnitAssets';
import RemoveUnit from './RemoveUnit';
import ViewHeader from './ViewHeader';
// import AddToFolio from './AddToFolio';
import * as folioActions from '../actions/actionCreators';
import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';
// import { handleNewTag } from './RouteLogic';
import { sendCommand, assetSelection } from './MessageHandler';
import { combineAssets, getUnitId, getAssets, checkUnitExists, checkIfEmpty } from './AssetManager';

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
      // activeButton: {},
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

    switch(tag){
      case 'ap1':
      case 'ap2':
        mediaGroup = 'Unit';
        this.assignToToken();
        break;
      case 'PHA':
      case 'PHB':
        mediaGroup = 'Unit_Penthouse';
        break;
      case 'am':
        mediaGroup = 'Amenities';
        break;
      case 'n':
        // console.log(tag);
        mediaGroup = 'Neighborhood';
        break;
      case 't':
        mediaGroup = 'Team';
        break;
      default:
        console.log('default');
        break;
    }

    if(this.state.mediaGroup !== mediaGroup) {
      // console.log('mediagroup: ' + mediaGroup)
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
    // console.log(media);

    // this.setState({
    //   selectedMedia: media
    // }, function(){
    //   console.log('selectedMedia updated');
    // })

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

    //send a websocket command to LED wall
    sendCommand(msg);
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
    sendCommand(command, path);

  }

  renderAssets(d){
    var details = {};
    if(this.state.mediaGroup === 'Unit' || this.state.mediaGroup === 'Unit_Penthouse'){
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
    updateCurrentUnit('');
    const currentTag = this.props.current.currentTag;
    assignUnitToToken(currentTag, '');
    var path = currentTag;
    this.context.router.push(path);
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
          {this.state.mediaGroup === 'Unit' || this.state.mediaGroup === 'Unit_Penthouse' ? this.renderAssets(residence) : this.renderAssets(media)}
        </div>
        <ViewHeader unitId={this.state.mediaGroup == 'Unit'|| this.state.mediaGroup == 'Unit_Penthouse' ? getUnitId() : this.state.mediaGroup} />
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
