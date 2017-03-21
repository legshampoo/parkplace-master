import React from 'react'

class ControlButton extends React.Component {
  constructor(props){
    super(props);
    this.click = this.click.bind(this);
  }

  click(e){
    this.props.handleClick(this);
  }

  render(){
    return(
      <button className='control-button' onClick={() => this.click()}>
        <p>{this.props.name}</p>
      </button>
    )
  }
}

ControlButton.propTypes = {
  name: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired
}

export default ControlButton;
