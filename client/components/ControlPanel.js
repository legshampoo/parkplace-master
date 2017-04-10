import React from 'react';
// import data from '../data/controlPanel';

import ControlGroup from './ControlGroup';
// import BackButton from './BackButton';
import AddToFolioButton from './AddToFolioButton';
import ControlButton from './ControlButton';
import RemoveUnit from './RemoveUnit';
// import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';

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

  handleClick(btn){
    console.log(btn.props.name);
  }

  renderBlankPanel(){
    return(
      <div className='control-panel-basic'>
      </div>
    )
  }

  renderPhotoControls(){
    console.log('render unit video');
    return (
      <div className='control-panel-groups'>
        <AddToFolioButton styleClass='add-to-folio-button'/>
        <div className='control-panel-left'>
          <ControlButton name='fill-horizontal' handleClick={this.handleClick.bind(this)}/>
          <ControlButton name='fill-vertical' handleClick={this.handleClick.bind(this)}/>
        </div>
        <div className='control-panel-right'>
          <ControlButton name='pan-left' handleClick={this.handleClick.bind(this)}/>
          <ControlButton name='o' handleClick={this.handleClick.bind(this)}/>
          <ControlButton name='pan-right' handleClick={this.handleClick.bind(this)}/>
        </div>
      </div>
    )
  }

  renderVideoControls(){
    return(
      <div className='control-panel-groups'>
        <AddToFolioButton styleClass='add-to-folio-button'/>
        <div className='control-panel-left'>
          <ControlButton name='play' handleClick={this.handleClick.bind(this)}/>
        </div>
        <div className='control-panel-right'>
          <ControlButton name='restart' handleClick={this.handleClick.bind(this)}/>
        </div>
      </div>
    )
  }

  renderControls(type){
    switch(type){
      case 'blank':
        return this.renderBlankPanel();

      case 'photo-controls':
        console.log(type);
        return this.renderPhotoControls();

      case 'video-controls':
        console.log(type);
        return this.renderVideoControls();

    }
  }

  render(){
    return(
      <div className='controlPanel'>
        {this.renderControls(this.props.type)}
        {/* <AddToFolioButton styleClass='add-to-folio-button'/> */}
        {/* {this.createGroups(this.props.dashboardData.groups)} */}
        {/* <div className='control-panel-left'>
          <ControlButton name='fill-horizontal' handleClick={this.handleClick.bind(this)}/>
          <ControlButton name='fill-vertical' handleClick={this.handleClick.bind(this)}/>
        </div> */}
        {/* <RemoveUnit styleClass='remove-unit-button-center' onClick={this.removeUnit.bind(this)}/> */}
        {/* <div className='control-panel-right'>
          <ControlButton name='pan-left' handleClick={this.handleClick.bind(this)}/>
          <ControlButton name='o' handleClick={this.handleClick.bind(this)}/>
          <ControlButton name='pan-right' handleClick={this.handleClick.bind(this)}/>
        </div> */}
      </div>
    )
  }
}

ControlPanel.propTypes = {
  // dashboardData: React.PropTypes.object.isRequired
  type: React.PropTypes.string.isRequired
}

export default ControlPanel;
