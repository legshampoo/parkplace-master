import React from 'react';

import ControlGroup from './ControlGroup';
import AddToFolioButton from './AddToFolioButton';
import ControlButton from './ControlButton';
import RemoveUnit from './RemoveUnit';

class ControlPanel extends React.Component {
  constructor(){
    super();
    this.renderControls = this.renderControls.bind(this);
  }

  createGroup(group){
    return(
      <ControlGroup key={group.name} data={group} />
    )
  }

  createGroups(groups){
    return groups.map(this.createGroup);
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
        <AddToFolioButton styleClass='add-to-folio-button'/>
        <div className='control-panel-left'>
          <ControlButton name='fill-horizontal' icon={require('../assets/icons/left_right_arrow.jpg')} handleClick={this.props.handleClick.bind(this)}/>
        <ControlButton name='fill-vertical' icon={require('../assets/icons/up_down_arrow.jpg')} handleClick={this.props.handleClick.bind(this)}/>
        </div>
        <div className='control-panel-right'>
          <ControlButton name='pan-left' icon={require('../assets/icons/left_arrow.jpg')} handleClick={this.props.handleClick.bind(this)}/>
        <ControlButton name='center-image' icon={require('../assets/icons/center.jpg')} handleClick={this.props.handleClick.bind(this)}/>
      <ControlButton name='pan-right' icon={require('../assets/icons/right_arrow.jpg')} handleClick={this.props.handleClick.bind(this)}/>
        </div>
      </div>
    )
  }

  renderVideoControls(){
    return(
      <div className='control-panel-groups'>
        <AddToFolioButton styleClass='add-to-folio-button'/>
        <div className='control-panel-left'>
          <ControlButton name='play' icon={require('../assets/icons/play.jpg')} handleClick={this.props.handleClick.bind(this)}/>
        </div>
        <div className='control-panel-right'>
          <ControlButton name='restart' icon={require('../assets/icons/restart.jpg')} handleClick={this.props.handleClick.bind(this)}/>
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
      <div className='controlPanel'>
        {this.renderControls(this.props.type)}
      </div>
    )
  }
}

ControlPanel.propTypes = {
  type: React.PropTypes.string.isRequired
}

export default ControlPanel;
