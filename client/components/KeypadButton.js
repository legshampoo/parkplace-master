import React from 'react';
import PropTypes from 'prop-types';

class KeypadButton extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)

    let styleClass = ''
  }

  handleClick(event){
    // console.log('click');
    this.props.updateInput(this.props.value)
  }

  render(){
    this.styleClass = this.props.styleClass

    return(
      <div className={this.styleClass} onClick={(e) => this.handleClick(e)}>
        {this.props.displayText}
      </div>
    )
  }
}

KeypadButton.propTypes = {
  styleClass: PropTypes.string.isRequired,
  displayText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateInput: PropTypes.func.isRequired
}

export default KeypadButton
