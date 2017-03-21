import React from 'react';

import KeypadButton from './KeypadButton';
import KeypadConsole from './KeypadConsole';
import KeypadSubmit from './KeypadSubmit';
import NavButton from './NavButton';
import ViewTitle from './ViewTitle';

import { updateCurrentUnit } from '../actions/actionCreators';

class Keypad extends React.Component {
  constructor(){
    super()
    this.updateInput = this.updateInput.bind(this)
    this.submit = this.submit.bind(this)

    this.state = {
      input: ''
    }
  }

  updateInput(val){

    let newString = this.state.input

    if(val == 'del'){
      //remove one character from end of string
      newString = newString.substring(0, newString.length - 1)
    }else if(val == 'blank'){
      console.log('blank');
      return;
    }else{
      //add the new char to the string
      newString = this.state.input + val
    }

    this.setState({input: newString}, () => {
      console.log(this.state.input)
    })
  }

  submit(){
    // console.log('submit: ' + this.state.input)
    // const id = this.state.input;
    const path = '/unit-details/' + this.state.input;
    updateCurrentUnit(this.state.input);
    this.context.router.push(path)

    //UPDATE CURRENT UNIT IN STORE (NEEDS NEW STATE)
    //IE: 'NOW WE ARE VIEWING UNIT #??? '
  }

  render(){
    return(
      <div className='view'>
        <div className='keypad-container'>
          <NavButton styleClass='nav-keypad-to-grid' name='Chart Option' path='/grid'/>

          <div className='keypad'>
            <KeypadConsole userInput={this.state.input} updateInput={this.updateInput}/>
            <div className='inner-keypad-wrapper'>
              <KeypadButton styleClass='keypad-button' displayText='1' value='1' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='2' value='2' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='3' value='3' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='4' value='4' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='5' value='5' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='6' value='6' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='7' value='7' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='8' value='8' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='9' value='9' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='W' value='W' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='0' value='0' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='E' value='E' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='' value='blank' updateInput={this.updateInput}/>
              <KeypadButton styleClass='keypad-button' displayText='ENTER' value='submit' updateInput={this.submit}/>
              <KeypadButton styleClass='keypad-button' displayText='' value='blank' updateInput={this.updateInput}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Keypad.contextTypes = {
  router: React.PropTypes.object
}

export default Keypad
