import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as folioActions from '../actions/actionCreators';

import KeypadButton from './KeypadButton';
import KeypadConsole from './KeypadConsole';
import KeypadSubmit from './KeypadSubmit';
import NavButton from './NavButton';
import ViewTitle from './ViewTitle';

import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';
import { handleNewTag, checkBothActive, handleBothActive, checkCompareMode } from './RouteLogic';
import { checkUnitExists } from './AssetManager';
import residenceData from '../data/residence';

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
    // console.log(val);
    let newString = this.state.input;

    if(val == 'del'){
      //remove one character from end of string
      newString = newString.substring(0, newString.length - 1)
    }else{
      //add the new char to the string
      newString = this.state.input + val;
    }

    // console.log('INPUT: ' + newString);

    this.setState({input: newString}, () => {
      // console.log(this.state.input)
    })
  }

  // assignToToken(){
  //   const currentTag = this.props.current.currentTag;
  //   const currentUnit = this.props.current.currentUnit;
  //
  //   assignUnitToToken(currentTag, currentUnit);
  // }

  submit(){
    var path = '';
    path = '/assets/' + this.state.input;

    var unitExists = checkUnitExists(residenceData, this.state.input);
    // var path = '/assets/' + this.state.input;
    // console.log(this.state.input);
    // if(this.state.input == 'PHA' || this.state.input == 'PHB'){
    //   path = handleNewTag(this.state.input);
    // }else{
    //   path = '/assets/' + this.state.input;
    // }


    //check if unit exists
    if(unitExists){
      assignUnitToToken(this.props.current.currentTag, this.state.input);
      updateCurrentUnit(this.state.input);
      var bothTagsActive = checkBothActive();
      console.log('both tags active, checking is should compare');
      if(bothTagsActive){
        console.log('both are active');
        var compare = checkCompareMode();
        console.log(compare);
        if(compare){
          console.log('compare is true');
          // path = handleBothActive(this.props.folio.ap1, this.props.folio.ap2);
          path = '/compare-units/' + this.props.folio.ap1 + '+' + this.props.folio.ap2;
          console.log(path);
        }
      }

      this.context.router.push(path)
    }else{
      this.setState({
        input: ''
      });
    }
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
              {/* <KeypadButton styleClass='keypad-button' displayText='PHA' value='PHA' updateInput={this.updateInput}/> */}
              {/* <KeypadButton styleClass='keypad-button' displayText='PHB' value='PHB' updateInput={this.updateInput}/> */}
              <KeypadButton styleClass='keypad-button' displayText='ENTER' value='submit' updateInput={this.submit}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Keypad.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps(state){
  return {
    folio: state.folio,
    current: state.current
  }
}

function mapDispatchToProps(dispatch){
  return {
    folioActions: bindActionCreators(folioActions, dispatch)
  }
}
// export default Keypad;
export default connect(mapStateToProps, mapDispatchToProps)(Keypad);
