import React from 'react'

import KeypadButton from './KeypadButton'

class KeypadConsole extends React.Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, key){
    console.log('text changed')
  }

  render() {
    return(
      <div className='keypad-console'>
        {/* <div className='keypad-text-underline'></div> */}
        <input
          type='text'
          className='keypad-text-display'
          value={this.props.userInput}
          name='unit'
          placeholder=''
        />
        <KeypadButton styleClass={'keypad-backspace'} displayText='<<' value='del' updateInput={this.props.updateInput}/>
      </div>
    )
  }
}

export default KeypadConsole
