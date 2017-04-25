import React from 'react';
import PropTypes from 'prop-types';

class ControlButton extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='control-button' onClick={() => this.props.handleClick(this.props.name)}>
        <img src={this.props.icon} alt='alternate'></img>
    </div>
    )
  }
}

ControlButton.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ControlButton;
