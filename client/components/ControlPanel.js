import React from 'react';
import PropTypes from 'prop-types';
// var request = require('request');

import ControlGroup from './ControlGroup';
import AddToFolio from './AddToFolio';
import ControlButton from './ControlButton';
import RemoveUnit from './RemoveUnit';

class ControlPanel extends React.Component {
  constructor(){
    super();
    this.renderControls = this.renderControls.bind(this);
    this.handleAddToFolio = this.handleAddToFolio.bind(this);
  }

  handleAddToFolio(media){
    console.log(media);
    fetch('http://192.168.45.21/api/folio/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'no-cors',
      body: JSON.stringify({
        url: '/media_path'
      })
    }).then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then(function(response) {
        console.log("ok");
    }).catch(function(error) {
        console.log(error);
    });
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
        <AddToFolio selectedAsset={this.props.selectedAsset} add={this.handleAddToFolio}/>
      <div className='control-panel-right'>
          <ControlButton name='fill-horizontal' icon={require('../assets/icons/left_right_arrow.png')} handleClick={this.props.handleClick.bind(this)}/>
          <ControlButton name='fill-vertical' icon={require('../assets/icons/up_down_arrow.png')} handleClick={this.props.handleClick.bind(this)}/>
        </div>
        <div className='control-panel-right'>
          <ControlButton name='pan-left' icon={require('../assets/icons/left_arrow.png')} handleClick={this.props.handleClick.bind(this)}/>
          <ControlButton name='center-image' icon={require('../assets/icons/center.png')} handleClick={this.props.handleClick.bind(this)}/>
          <ControlButton name='pan-right' icon={require('../assets/icons/right_arrow.png')} handleClick={this.props.handleClick.bind(this)}/>
        </div>
      </div>
    )
  }

  renderVideoControls(){
    return(
      <div className='control-panel-groups'>
        <AddToFolio selectedAsset={this.props.selectedAsset}/>
        <div className='control-panel-left'>
          <ControlButton name='play' icon={require('../assets/icons/play.png')} handleClick={this.props.handleClick.bind(this)}/>
        </div>
        <div className='control-panel-right'>
          <ControlButton name='restart' icon={require('../assets/icons/restart.png')} handleClick={this.props.handleClick.bind(this)}/>
        </div>
      </div>
    )
  }

  renderControls(type){
    switch(type){
      case 'blank':
        return this.renderBlankPanel();

      case 'photo-controls':
        // console.log(type);
        return this.renderPhotoControls();

      case 'video-controls':
        // console.log(type);
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
