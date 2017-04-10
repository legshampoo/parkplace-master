import React from 'react';

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
  displayText: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

export default AssignToTokenButton;
