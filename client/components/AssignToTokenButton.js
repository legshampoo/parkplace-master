import React from 'react';

class AssignToTokenButton extends React.Component {
  render(){
    return(
      <div className='assign-unit-button' onClick={() => this.props.onClick(this)}>
        <h1>{this.props.displayText}</h1>
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
