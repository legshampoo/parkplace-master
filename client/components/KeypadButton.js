import React from 'react'

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
  styleClass: React.PropTypes.string.isRequired,
  displayText: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  updateInput: React.PropTypes.func.isRequired
}

export default KeypadButton
