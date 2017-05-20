import React from 'react';
import PropTypes from 'prop-types';

import ControlGroup from './ControlGroup';
import AddToFolio from './AddToFolio';
import ControlButton from './ControlButton';
import RemoveUnit from './RemoveUnit';

import { fitHorizontal, fitVertical, panLeft, panRight, panCenter, play, restart, addToFolio } from './MessageHandler';

class ControlPanel extends React.Component {
  constructor(props){
    super(props);
    this.renderControls = this.renderControls.bind(this);
    this.handleAddToFolio = this.handleAddToFolio.bind(this);
  }

  componentDidMount(){
    // console.log(this.props.selectedMedia);
  }

  handleAddToFolio(media){
    // console.log(media);
    var mediaPath = '';
    if(this.props.mediaGroup === 'Unit' || this.props.mediaGroup === 'Unit_Penthouse'){
      mediaPath = media.full_screen;
    }else{
      mediaPath = media.wall;
    }
    console.log('add to folio');
    addToFolio(mediaPath);
  }

  renderBlankPanel(){
    return(
      <div className='control-panel-basic'>
      </div>
    )
  }

  renderPhotoControls(){
    return (
      <div className='control-panel-groups'>
        <AddToFolio
          message={addToFolio}
          selectedMedia={this.props.selectedMedia}
          add={this.handleAddToFolio}/>
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
            message={panLeft}
            name='pan-left'
            icon={require('../assets/icons/left_arrow.png')}
            handleClick={this.props.handleClick.bind(this)}/>
          <ControlButton
            message={panCenter}
            name='center-image'
            icon={require('../assets/icons/center.png')}
            handleClick={this.props.handleClick.bind(this)}/>
          <ControlButton
            message={panRight}
            name='pan-right'
            icon={require('../assets/icons/right_arrow.png')}
            handleClick={this.props.handleClick.bind(this)}/>
        </div>
      </div>
    )
  }

  renderVideoControls(){
    return(
      <div className='control-panel-groups'>
        <AddToFolio
          message={addToFolio}
          add={this.handleAddToFolio}
          selectedMedia={this.props.selectedMedia}/>
        <div className='control-panel-left'>
          <ControlButton
            message={play}
            name='play'
            icon={require('../assets/icons/play.png')}
            handleClick={this.props.handleClick.bind(this)}/>
        </div>
        <div className='control-panel-right'>
          <ControlButton
            message={restart}
            name='restart'
            icon={require('../assets/icons/restart.png')}
            handleClick={this.props.handleClick.bind(this)}/>
        </div>
      </div>
    )
  }

  renderControls(type){
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
