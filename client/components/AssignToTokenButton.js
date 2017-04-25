import React from 'react';
import PropTypes from 'prop-types';

class AssignToTokenButton extends React.Component {
  render(){
    return(
      <div className='assign-unit-button' onClick={() => this.props.onClick(this)}>
        {this.props.displayText}
      </div>
    )
  }
}

AssignToTokenButton.contextTypes = {
  router: React.PropTypes.object
}

AssignToTokenButton.propTypes = {
  displayText: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default AssignToTokenButton;
