import React from 'react';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as folioActions from '../actions/actionCreators';

import Details from './Details'

class UnitInfo extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      residences: {}
    }
  }

  componentDidMount(){
    this.setState({ residences: this.props.residences.data });
  }

  getUnitData(d, unit){
    var unitData = {};

    try{
      Object.keys(d).map(function(key, index){
        if(d[key].name == unit){
          unitData = d[key];
        }
      });
    }catch(err){
      console.log('errr');
    }

    return unitData;
  }

  renderDetails(d, unit){
    var details = this.getUnitData(d, unit)
    // console.log(details);

    return(
      <Details details={details} />
    )
  }
  render(){
    return(
      <div className='unit-info'>
        {this.renderDetails(this.state.residences, this.props.unitId)}
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(UnitInfo);
