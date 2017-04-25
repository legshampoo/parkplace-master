import React from 'react'
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

// import { connect } from 'react-redux';
// import store from '../store';

class Button extends React.Component {
  constructor(props){
    super(props)

    this.click = this.click.bind(this)
    this.apartmentRouteFn = this.apartmentRouteFn.bind(this)

    const { styleClass } = 'nav-button';

  }

  apartmentRouteFn(initialRouteTO, unit) {
    localStorage.setItem('currentUnit', this.props.name)
    const getUnitAP1 = localStorage.getItem('Ap1')
    const getUnitAP2 = localStorage.getItem('Ap2')

    //if ap1 AND ap2 are true
    if(this.props.tagStatus.ap1 && this.props.tagStatus.ap2){
      console.log('both are true');
      if(getUnitAP1 && getUnitAP2){
        return `/compare-units/${getUnitAP1}+${getUnitAP2}`
      }else if (getUnitAP1 && unit === 'Ap1') {
        return `/unit-details/${getUnitAP1}`
      }else if (getUnitAP2 && unit === 'Ap2') {
        return `/unit-details/${getUnitAP2}`
      }
    }

    //if only one tag is down
    if (getUnitAP1 && unit === 'Ap1') {
      return `/unit-details/${getUnitAP1}`
    }else if (getUnitAP2 && unit === 'Ap2') {
      return `/unit-details/${getUnitAP2}`
    }else {
      return initialRouteTO
    }
  }

  click(){
    console.log('click');
    // this.props.buttonClicked(this);

    const units = ['Ap1', 'Ap2']
    const unitsCheck = units.includes(this.props.name)

    var unitRouteHandler = false;
    if(unitsCheck){
      unitRouteHandler = this.apartmentRouteFn(this.props.path, this.props.name);
    }else{
      unitRouteHandler = false;
    }

    if(unitRouteHandler){
      this.context.router.push(unitRouteHandler);
    }else{
      this.context.router.push(this.props.path);
    }

  }

  render(){
    // if(this.props.activeButton == this.props.name){
    //   this.styleClass = 'nav-button-active'
    // }else{
    //   this.styleClass = 'nav-button'
    // }
    if(this.props.tags[this.props.name]){
      this.styleClass = 'nav-button-active'
    }else{
      this.styleClass = 'nav-button'
    }

    return(
      <div>
        <button name='navButtons' className={this.styleClass} onClick={() => this.click()}>
          {this.props.name}
        </button>
      </div>
    )
  }
}

Button.contextTypes = {
  router: PropTypes.object
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  buttonClicked: PropTypes.func.isRequired,
  tagStatus: PropTypes.object.isRequired,
  tagState: PropTypes.bool,
  tags: PropTypes.object.isRequired
}

export default Button;
