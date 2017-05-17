import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as folioActions from '../actions/actionCreators';

import { updateCurrentUnit, assignUnitToToken } from '../actions/actionCreators';
import { handleNewTag, checkBothActive, handleBothActive, checkCompareMode } from './RouteLogic';
import { checkUnitExists } from './AssetManager';

class GridUnit extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(event){
    event.preventDefault();
    // var path = '/unit-details/' + this.props.name;
    var path = '/assets/' + this.props.name;

    if(this.props.interactive){
      updateCurrentUnit(this.props.name);
      assignUnitToToken(this.props.current.currentTag, this.props.name);
      var bothTagsActive = checkBothActive();
      if(bothTagsActive){
        var compare = checkCompareMode();
        if(compare){
          path = '/compare-units/' + this.props.folio.ap1 + '+' + this.props.folio.ap2;
        }
      }
      this.context.router.push(path);
    }else{
      return;
    }
  }

  render(){
    return(
      <button
        className={this.props.interactive === true ? 'grid-unit' : 'grid-unit-category'}
        onClick={(e) => this.onClick(e)}>
        <h1>{this.props.name}</h1>
      </button>
    )
  }
}

GridUnit.contextTypes = {
  router: PropTypes.object
}

GridUnit.propTypes = {
  name: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired
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

// export default GridUnit;
export default connect(mapStateToProps, mapDispatchToProps)(GridUnit);
