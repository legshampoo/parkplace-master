import React from 'react';
import PropTypes from 'prop-types';

import ControlGroup from './ControlGroup';
import AddToFolio from './AddToFolio';
import ControlButton from './ControlButton';
import RemoveUnit from './RemoveUnit';
// import { sendCommand, resume } from './MessageHandler';

import { sendCommand, fitHorizontal, fitVertical, panLeft, panRight, panCenter, resume, pause, rewind, addToFolio, removeFromFolio } from './MessageHandler';

class ControlPanel extends React.Component {
  constructor(props){
    super(props);
    this.renderControls = this.renderControls.bind(this);
    this.handleAddToFolio = this.handleAddToFolio.bind(this);
    this.videoPlay = this.videoPlay.bind(this);
    this.updateFolioStatus = this.updateFolioStatus.bind(this);

    this.state = {
      videoPlay: true
    }
  }

  componentDidMount(){
    // console.log(this.props.selectedMedia);
    // console.log(this.props.selectedMedia);
  }

  videoPlay(){
    var play = this.state.videoPlay;

    this.setState({ videoPlay: !play }, function(){
      var cmd = {};
      if(this.state.videoPlay){
        cmd = resume;
      }else{
        cmd = pause;
      }
      sendCommand(cmd);
    });
  }

  handleAddToFolio(media){
    // console.log(media);
    var mediaPath = '';
    if(this.props.mediaGroup === 'Unit' || this.props.mediaGroup === 'Unit_Penthouse'){
      mediaPath = media.full_screen;
    }else{
      mediaPath = media.wall;
    }

    if(!media.saved){
      //add to folio, return with the folio id for later use
      var _this = this;
      addToFolio(mediaPath, function(id){
        console.log(`folio id: ${id}`);
        media.folio_id = id;
        media.saved = true;
        _this.updateFolioStatus(media);
      });

    }else{
      var _this = this;
      console.log(`removing ${media.folio_id} from folio`);
      removeFromFolio(media, function(id){
        console.log(`${id} removed from folio success`);
        // media.saved = !media.saved;
        // this.setState({ selectedMedia: media });
        media.folio_id = id;
        media.saved = false;
        _this.updateFolioStatus(media);
      });
    }
  }

  updateFolioStatus(media){
    // media.saved = !media.saved;
    this.setState({ selectedMedia: media }, function(){
      console.log('finished updating media status');
    });
  }

  renderBlankPanel(){
    return(
      <div className='control-panel-basic'>
      </div>
    )
  }

  renderPhotoControls(){
    if(this.props.zoom){
      return (
        <div className='control-panel-groups'>
          <AddToFolio
            message={addToFolio}
            selectedMedia={this.props.selectedMedia}
            add={this.handleAddToFolio}
            saved={this.props.selectedMedia.saved}
          />
          <div className='control-panel-right'>
            <ControlButton
              message={fitHorizontal}
              name='fill-horizontal'
              icon={require('../assets/icons/left_right_arrow.png')}
              handleClick={this.props.handleClick.bind(this)}/>
            <ControlButton
              message={fitVertical}
              name='fill-vertical'
              icon={require('../assets/icons/up_down_arrow.png')}
              handleClick={this.props.handleClick.bind(this)}/>
          </div>
          <div className='control-panel-right'>
            <ControlButton
              message={panRight}
              name='pan-left'
              icon={require('../assets/icons/left_arrow.png')}
              handleClick={this.props.handleClick.bind(this)}/>
            <ControlButton
              message={panCenter}
              name='center-image'
              icon={require('../assets/icons/center.png')}
              handleClick={this.props.handleClick.bind(this)}/>
            <ControlButton
              message={panLeft}
              name='pan-right'
              icon={require('../assets/icons/right_arrow.png')}
              handleClick={this.props.handleClick.bind(this)}/>
          </div>
        </div>
      )
    }else{
      return (
        <div className='control-panel-groups'>
          <AddToFolio
            message={addToFolio}
            selectedMedia={this.props.selectedMedia}
            add={this.handleAddToFolio}
            saved={this.props.selectedMedia.saved}
        />
        </div>
      )
    }
  }

  renderVideoControls(){
    return(
      <div className='control-panel-groups'>
        <AddToFolio
          message={addToFolio}
          add={this.handleAddToFolio}
          selectedMedia={this.props.selectedMedia}
          saved={this.props.selectedMedia.saved}
        />
        <div className='control-panel-left'>
          <ControlButton
            message={resume}
            name='play'
            icon={this.state.videoPlay ? require('../assets/icons/pause.png') : require('../assets/icons/play.png')}
            // handleClick={this.props.handleClick.bind(this)}/>
            handleClick={this.videoPlay.bind(this)}/>
        </div>
        <div className='control-panel-right'>
          <ControlButton
            message={rewind}
            name='rewind'
            icon={require('../assets/icons/restart.png')}
            handleClick={this.props.handleClick.bind(this)}/>
        </div>
      </div>
    )
  }

  renderControls(type){
    // console.log(this.props.selectedMedia);
    switch(type){
      case 'blank':
        return this.renderBlankPanel();

      case 'photo-controls':
        return this.renderPhotoControls();

      case 'video-controls':
        return this.renderVideoControls();

    }
  }

  render(){
    return(
      <div className='control-panel'>
        {this.renderControls(this.props.type)}
      </div>
    )
  }
}

ControlPanel.propTypes = {
  type: PropTypes.string.isRequired
}

export default ControlPanel;
