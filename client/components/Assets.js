import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as browserHistory from './History';
import TextLink from './TextLink';
import TextLinkBorder from './TextLinkBorder';
import NextPageButton from './NextPageButton';
import ControlPanel from './ControlPanel';
import RenderAssets from './RenderAssets';
import RemoveUnit from './RemoveUnit';
import ViewHeader from './ViewHeader';
import * as folioActions from '../actions/actionCreators';
import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';
import { sendCommand, assetSelection, fitVertical, fitHorizontal } from './MessageHandler';
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
      pageIndex: 0,
      residences: {},
      media: {}
    }
  }

  componentDidMount(){
    this.setState({
      media: this.props.media.data,
      residences: this.props.residences.data
    }, function(){
      // console.log(this.state.media);
      // console.log(this.state.residences);
    });
    // console.log('mounted');
    this.updateProps();
  }

  updateProps(){
    var mediaGroup = this.state.mediaGroup;
    var tag = this.props.current.currentTag;
    var unitLED = '';

    switch(tag){
      case 'ap1':
      case 'ap2':
      case 'PHA':
      case 'PHB':
        mediaGroup = 'Unit';

        if(tag === 'PHA'){
          unitLED = 'PHA';
        }else if(tag === 'PHB'){
          unitLED = 'PHB';
        }else if(tag === 'ap1' || tag === 'ap2'){
          unitLED = this.props.current.currentUnit;
          console.log(`UnitLED: ${unitLED}`);
        }

        var led_id = getLightingId(unitLED);
        //send request to LED lighting API
        console.log(`${unitLED} LED On: ${led_id}`);
        if(led_id != 0){
          lightingControl(led_id, true);
        }else{
          //do nothing
        }

        break;
      case 'am':
        mediaGroup = 'Amenities';
        unitLED = 'Amenities';
        var led_id = getLightingId(unitLED);

        console.log(`${unitLED} LED ON: ${led_id}`);
        lightingControl(led_id, true);
        break;
      case 'n':
        mediaGroup = 'Neighborhood';
        break;
      case 't':
        mediaGroup = 'Team';
        break;
      default:
        console.log('default');
        mediaGroup = '';
        break;
    }

    if(this.state.mediaGroup !== mediaGroup) {
      this.setState({
        mediaGroup: mediaGroup,
        previousTag: tag,
        locationPathname: this.props.location.pathname
      }, function(){
        // console.log('finished initial update');
      });
    }
  }

  componentDidUpdate() {
    //WTF WAS THIS ABOUT??!!
    // if(this.state.locationPathname !== this.props.location.pathname) {
    //   console.log(this.props.location, this.props.match)
    //   console.log('did update');
    //   this.updateProps();
    // }
    if(this.state.previousTag !== this.props.current.currentTag) {
      // console.log(this.props.location, this.props.match)
      this.setState({ previousTag: this.props.current.currentTag }, function(){
        console.log('tag is different then previous, preparing to update...');
        this.updateProps();
      });
    }
    // this.updateProps();
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
    if(this.state.mediaGroup === 'Unit'){
      var unit = getUnitId();
      // dataSet = getAssets(residence, unit).media;  //ORIGINAL
      dataSet = getAssets(this.state.residences, unit).media;
    }else{
      // var d = getAssets(media, this.state.mediaGroup);  //ORIGINAL
      var d = getAssets(this.state.media, this.state.mediaGroup);
      dataSet = combineAssets(d, this.state.mediaGroup);
    }

    if((index + 1) > Math.ceil(dataSet.length / 6)){
      index = index - 1;
    }

    this.setState({pageIndex: index});
  }


  selectMedia(media, type){
    var msg = new assetSelection();

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

    if(this.state.mediaGroup == 'Unit'){
      msg.params.url = media.full_screen;
    }else{
      msg.params.url = media.wall;
    }

    //send asset command to CMS
    sendCommand(msg);

    //send fit to height command to CMS as default way to display asset
    sendCommand(fitHorizontal);
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
      // empty array do nothing
    }

  }

  removeUnit(d){
    // console.log(this.props.unitId);
    //turn off the LED lighting
    var unit = this.props.current.currentUnit;
    console.log(unit);
    var led_id = getLightingId(unit);

    if(led_id != 0){
      //send command to turn LED lights off
      // console.log('turn off LED for: ' + unit);
      console.log(`Remove Unit: ${unit} , LED OFF: ${led_id}`);
      lightingControl(led_id, false);
    }

    // console.log('remove unit from token assignment: ' + unit);
    updateCurrentUnit('');
    const currentTag = this.props.current.currentTag;
    assignUnitToToken(currentTag, '');
    var path = currentTag;
    // console.log(this.props.location.pathname);
    // console.log(this.props.router);
    // this.context.router.push(path);
    let history = browserHistory.getHistoryList();
    console.log(history);

    //if the previous path was from 'home' then go to keypad

    // if(history.length>2 && (history[history.length-2] === '/')){
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   browserHistory.push(path);
    // }else if(history.length>2 && (history[history.length-2].includes("compare-units"))){
    //   //if the previous path was from 'compare mode' then go to keypad
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   console.log(`path: ${path}`);
    //   browserHistory.push(path);
    //   return;
    // }else if(history.length>2 && (history[history.length-2].includes("am"))){
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   browserHistory.push(path);
    //   return;
    // }else if(history.length>2 && (history[history.length-2].includes("t"))){
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   browserHistory.push(path);
    //   return;
    // }else if(history.length>2 && (history[history.length-2].includes("n"))){
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   browserHistory.push(path);
    //   return;
    // }else if(history.length>2 && (history[history.length-2].includes("PHA"))){
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   browserHistory.push(path);
    //   return;
    // }else if(history.length>2 && (history[history.length-2].includes("PHB"))){
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   browserHistory.push(path);
    //   return;
    // }else if(history.length>2 && (history[history.length-2].includes("grid"))){
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   browserHistory.push('/grid');
    //   return;
    // }else{
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   console.log(`go back`);
    //   //otherwise go back to where the user came from (keypad or grid)
    //   browserHistory.goBack();
    //   return;
    // }
    console.log(`last path: ${history[history.length - 2]}`);

    if(history[history.length - 2] === '/'
      || history[history.length - 2] === '/assets/n'
      || history[history.length - 2] === '/assets/am'
      || history[history.length - 2] === '/assets/t'
      || history[history.length - 2] === '/assets/PHA'
      || history[history.length - 2] === '/assets/PHB'
      || history[history.length - 2].includes('compare-units')){

      //go to the current tag url
      browserHistory.push(currentTag);
    }else{
      //go back (should either be keypad or grid)
      browserHistory.goBack();
    }
    //-------------------------------------
    // if(history.length <= 2){
    //   console.log(`less than 2`);
    //   browserHistory.goBack();
    // }else if(history.length>2 && (history[history.length-1] === '/')){
    //   console.log(`previous path: ${history[history.length-2]}`)
    //   //push to currentTag
    //   console.log(`path: ${path}`);
    //   browserHistory.push(path);
    //   return
    // }else if(history.length>2 && (history[history.length-1].includes("grid"))){
    //   console.log(`previous path: ${history[history.length-1]}`)
    //   browserHistory.push('/grid');
    //   return;
    // }else if(history.length>2 && (history[history.length-1].includes("keypad"))){
    //   console.log(`previous path: ${history[history.length-1]}`)
    //   browserHistory.push('/keypad');
    //   return;
    // }else if(history.length>2 && (history[history.length-1].includes("ap1"))){
    //   console.log(`previous path: ${history[history.length-1]}`)
    //   browserHistory.push('ap1');
    //   return;
    // }

    // console.log(`no conditions true, defaulting to go back`);
    // browserHistory.goBack();
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
        {this.state.mediaGroup === 'Unit' ? this.renderAssets(this.state.residences) : this.renderAssets(this.state.media)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Assets);
