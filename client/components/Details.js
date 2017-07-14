import React from 'react';

import DetailText from './DetailText';
import { formatData } from './AssetManager';

class Details extends React.Component{
  constructor(props){
    super(props);
  }

  renderDetails(data){

    var newData = formatData(data);
    console.log(newData);
    return(
      Object.keys(newData).map(function(key, index){
        var val = newData[key];

        if(key === 'hasTerrace'){
          return;
        }
        if(!newData.hasTerrace && key === 'Exterior'){
          return;
        }
      
        return(
          <DetailText
            title={key}
            value={val}
            key={index} 
          />
        )
      })
    )
  }

  render(){
    return(
      <div>
        {this.renderDetails(this.props.details)}
      </div>
    )
  }
}

export default Details;
