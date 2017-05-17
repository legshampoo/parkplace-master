import React from 'react';

import data from '../data/residence.json';
import Details from './Details'

class UnitInfo extends React.Component {
  constructor(props){
    super(props);
    // console.log(props);
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
        {this.renderDetails(data, this.props.unitId)}
      </div>
    )
  }
}

export default UnitInfo;
