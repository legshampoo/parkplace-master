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
import RenderNonUnitAssets from './RenderNonUnitAssets';
import RemoveUnit from './RemoveUnit';
import ViewHeader from './ViewHeader';
// import AddToFolio from './AddToFolio';
import * as folioActions from '../actions/actionCreators';
import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';
import { handleNewTag } from './RouteLogic';

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
      activeButton: {},
      selectedMediaType: '',
      pageIndex: 0
    }
  }

  componentDidMount(){
    this.updateProps();
  }

  updateProps(){
    console.log('LOADING...');
    console.log(media);
    console.log(residence);
    // this.assignToToken();

    var mediaGroup = this.state.mediaGroup;

    var tag = this.props.current.currentTag;

    switch(tag){
      case 'ap1':
      case 'ap2':
        console.log(tag);
        mediaGroup = 'Unit';
        this.assignToToken();
        break;
      case 'PHA':
      case 'PHB':
        console.log('ph: ' + tag);
        mediaGroup = 'Unit_Penthouse';
        break;
      case 'am':
        console.log(tag);
        mediaGroup = 'Amenities';
        break;
      case 'n':
        console.log(tag);
        mediaGroup = 'Neighborhood';
        break;
      case 't':
        console.log(tag);
        mediaGroup = 'Team';
        break;
      default:
        console.log('default');
        break;
    }
    console.log('before state update');

    if(this.state.mediaGroup !== mediaGroup) {
      console.log('mediagroup: ' + mediaGroup)
      this.setState({
        mediaGroup: mediaGroup,
        locationPathname: this.props.location.pathname
      }, function(){
        console.log('media group set to ' + mediaGroup);
      });
    }
  }

  componentDidUpdate() {
    if(this.state.locationPathname !== this.props.location.pathname) {
      console.log(this.props.location, this.props.match)
      console.log('did update');
      this.updateProps();
    }
    console.log('did update eval to false');
  }


  assignToToken(){
    console.log('assign to token');
    const currentTag = this.props.current.currentTag;
    const currentUnit = this.props.current.currentUnit;

    assignUnitToToken(currentTag, currentUnit);
  }

  changePageIndex(val){
    var index = this.state.pageIndex + val;

    if(index < 0){
      index = 0;
    }
    // console.log('pageIndex: ' + index);

    if(this.state.mediaGroup == 'Unit' || this.state.mediaGroup == 'Unit_Penthouse'){
      var unit = this.getUnitId();
      var unitData = this.getAssets(residence, unit);

      if((index + 1) > Math.ceil(unitData.media.length / 6)){
        // console.log('page index limit');
        index = index - 1;
      }
    }

    this.setState({pageIndex: index});
  }

  selectMedia(media, type){
    console.log(media);
    var activeButton = this.state.activeButton;
    activeButton = media;

    var selectedMediaType = this.state.selectedMediaType;
    selectedMediaType = type;

    this.setState({
      activeButton: activeButton,
      selectedMediaType: selectedMediaType
    }, function(){
      console.log('active button: ' + activeButton.name);
    });
  }

  getAssets(data, val){
    var unitData = {};
    console.log(data);
    console.log(val);
    try{
      Object.keys(data).map(function(key, index){
        if(data[key].name == val){
          unitData = data[key];
        }
      });
    }catch(err){
      console.log('errrrerrrerer');
    }

    return unitData;
  }

  checkUnitExists(d, unit){
    var found = false;

    try{
      Object.keys(d).map(function(key, index){
        if(d[key].name == unit){
          found = true;
        }
      });
    }catch(err){
      console.log('unit exists errrr');
    }

    return found;
  }

  checkIfEmpty(obj){
    try{
      return Object.keys(obj).length === 0;
    }catch(e){
      return true;
    }
    return false;
  }

  getUnitId(){
    var unitId = '';
    console.log(this.props.current.currentTag);
    if(this.props.current.currentTag == 'PHA' || this.props.current.currentTag == 'PHB'){
      unitId = this.props.current.currentTag;
      if(unitId == 'PHA' || unitId == 'PHB'){
        unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
      }
    }else{
      unitId = this.props.current.currentUnit;
    }

    console.log('unit ID: ' + unitId);

    return unitId;
  }

  renderControlPanel(){
    if(this.state.selectedMediaType === 'video'){
      return(
        <ControlPanel
          type='video-controls'
          handleClick={this.sendControlMessage.bind(this)}/>
      )
    }
    if(this.state.selectedMediaType === 'photo'){
      return(
        <ControlPanel
          type='photo-controls'
          handleClick={this.sendControlMessage.bind(this)}/>
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

  renderAssets(d){
    if(this.state.mediaGroup === 'Unit' || this.state.mediaGroup == 'Unit_Penthouse'){
      var unit = this.getUnitId();
      var found = this.checkUnitExists(d, unit);

      try{
        if(found){
          var details = this.getAssets(d, unit);
          var mediaAssets = details.media;
          var isEmpty = this.checkIfEmpty(mediaAssets);
          if(isEmpty){
            console.log('no media found');
          }
          // console.log(mediaAssets);
          return(
            <RenderAssets
              pageIndex={this.state.pageIndex}
              handleClick={this.selectMedia}
              data={mediaAssets}
              activeButton={this.state.activeButton}
              mediaType='photo' />
          )
        }else{
          console.log('unit' + unit + ' not found');
          console.log('SHOULD return to keypad');
          // var path = this.props.current.currentTag;
          // var tag = this.props.current.currentTag;
          // var path = handleNewTag(tag);
          // this.context.router.push(path);
          // this.context.router.goBack();
          // return;
        }
      }catch(e){
        console.log('problem finding media');
      }
    }else{
      //otherwise render Media assets
      // var details = this.getAssets(media, this.state.mediaGroup);
      var details = this.getAssets(d, this.state.mediaGroup);
      console.log(details);
      var isEmpty = this.checkIfEmpty(details);
      console.log(isEmpty);
      if(!isEmpty){
        return (
          <RenderNonUnitAssets
            pageIndex={this.state.pageIndex}
            handleClick={this.selectMedia}
            data={details}
            activeButton={this.state.activeButton}/>
        )
      }
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
        <RemoveUnit styleClass='remove-unit-button-center'
          onClick={this.removeUnit.bind(this)} />
      )
    }
  }

  renderControlPanel(){
    if(this.state.selectedMediaType === 'video'){
      return(
         <ControlPanel type='video-controls' handleClick={this.sendControlMessage.bind(this)} selectedAsset={this.state.activeButton}/>
      )
    }
    if(this.state.selectedMediaType === 'photo'){
      return(
        <ControlPanel type='photo-controls' handleClick={this.sendControlMessage.bind(this)} selectedAsset={this.state.activeButton}/>
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
        <ViewHeader unitId={this.state.mediaGroup == 'Unit'|| this.state.mediaGroup == 'Unit_Penthouse' ? this.getUnitId() : this.state.mediaGroup} />
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
