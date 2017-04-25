import React from 'react';

import DetailText from './DetailText';

class Details extends React.Component{
  constructor(props){
    super(props);
  }

  renderDetails(d){
    console.log(d);
    return(
        Object.keys(d).map(function(key, index){
          if(typeof(d[key]) === 'object'){
            console.log('found object');
            return;
          }else{
            return(
              <DetailText title={key} value={d[key]} />
            )
          }
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
