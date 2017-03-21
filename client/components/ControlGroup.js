import React from 'react';
import ControlButton from './ControlButton';

class ControlGroup extends React.Component {
  constructor(){

    super();
    this.createButtonGroups = this.createButtonGroups.bind(this);
    this.createButton = this.createButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(btn){
    console.log(btn.props.name);
  }

  createButton(button){
    return(
      <ControlButton key={button} name={button} handleClick={this.handleClick.bind(this)}/>
    )
  }

  createButtonGroups(group){
    return group.map(this.createButton);
  }

  render(){
    return(
      <div className='control-group'>
        {this.createButtonGroups(this.props.data.buttons)}
      </div>
    )
  }
}

export default ControlGroup;
