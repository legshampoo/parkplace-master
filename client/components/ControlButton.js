import React from 'react';
import PropTypes from 'prop-types';

class ControlButton extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='control-button' onClick={() => this.props.handleClick(this.props.message)}>
        <img src={this.props.icon} alt='alternate'></img>
    </div>
    )
  }
}

ControlButton.propTypes = {
  message: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ControlButton;
