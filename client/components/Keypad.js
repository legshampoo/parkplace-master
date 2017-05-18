import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as folioActions from '../actions/actionCreators';
import * as browserHistory from './History';

import KeypadButton from './KeypadButton';
import KeypadConsole from './KeypadConsole';
import KeypadSubmit from './KeypadSubmit';
import NavButton from './NavButton';
import ViewTitle from './ViewTitle';

import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';
import { handleNewTag, checkBothActive, handleBothActive, checkCompareMode } from './RouteLogic';
import { checkUnitExists } from './AssetManager';

class Keypad extends React.Component {
  constructor(){
    super()
    this.updateInput = this.updateInput.bind(this)
    this.submit = this.submit.bind(this)

    this.state = {
      input: '',
      residences: {}
    }
  }

  componentDidMount(){
    this.setState({ residences: this.props.residences.data });
  }

  updateInput(val){
    let newString = this.state.input;

    if(val == 'del'){
      //remove one character from end of string
      newString = newString.substring(0, newString.length - 1)
    }else{
      //add the new char to the string
      newString = this.state.input + val;
    }

    this.setState({ input: newString });
  }

  submit(){
    var path = '';
    path = '/assets/' + this.state.input;

    // var unitExists = checkUnitExists(residenceData, this.state.input);
    var unitExists = checkUnitExists(this.state.residences, this.state.input);

    //check if unit exists
    if(unitExists){
      console.log(this.props.current.currentTag, this.state.input);
      assignUnitToToken(this.props.current.currentTag, this.state.input);
      updateCurrentUnit(this.state.input);
      var bothTagsActive = checkBothActive();

      if(bothTagsActive){
        console.log('both tags are active');
        var compare = checkCompareMode();

        console.log('compare mode is: ' + compare);

        if(compare){
          path = '/compare-units/' + compare[0] + '+' + compare[1];
        }
      }

      // this.context.router.push(path)
      browserHistory.push(path);
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
    current: state.current,
    residences: state.assets.residences,
    media: state.assets.media
  }
}

function mapDispatchToProps(dispatch){
  return {
    folioActions: bindActionCreators(folioActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keypad);
