import React from 'react';

import DetailText from './DetailText';

class Details extends React.Component{
  constructor(props){
    super(props);
  }

  renderDetails(d){
    return(
        Object.keys(d).map(function(key, index){
          if(typeof(d[key]) === 'object'){
            return;
          }else{
            if(
              key === 'availability' ||
              key === 'featured' ||
              key === 'unit' ||
              key === 'name' ||
              key === 'line' ||
              key === 'led_id')
              {
                //do nothing
              }else{
                console.log(`key: ${key}`);
                console.log(`value: ${d[key]}`);
                if(key === 'terrace'){
                  if(d[key] === false){
                    //terrace is false, don't show it
                    return;
                  }else{
                    //it has a terrace, change it to display Yes
                    d[key] = 'Yes';
                  }
                }

                if(key === 'interior_square_feet' || key === 'exterior_square_feet'){
                  var rounded = Math.round(d[key]);
                  d[key] = rounded;
                }

                if(key === 'interior_square_meters' || key === 'exterior_square_meters'){
                  var rounded = Math.round(d[key] * 10) / 10;
                  d[key] = rounded;
                }

                var str = key.replace(/_/g, ' ');
                var title = str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');


                return(
                  <DetailText
                    title={title}
                    value={d[key].toString()}
                    key={index} />
                )
              }
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
