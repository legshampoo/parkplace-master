import React from 'react';

import DetailText from './DetailText';
import { formatData } from './AssetManager';

class Details extends React.Component{
  constructor(props){
    super(props);
  }

  renderDetails(d){
    var hasTerrace = false;
    var dataToShow = {};
    var price = '';
    var interiorSqFeet = '';
    var interiorSqMeters = '';
    var exteriorSqFeet = '';
    var exteriorSqMeters = '';
    var interiorDims = '';

    return(

        Object.keys(d).map(function(key, index){
          // console.log(key);
          // console.log(d[key]);

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
                return
              }else{
                // console.log(`key: ${key}`);
                // console.log(`value: ${d[key]}`);
                // var formattedData = '';
                
                if(key === 'terrace'){
                  if(d[key] === false){
                    //terrace is false, don't show it
                    hasTerrace = false;
                    return
                  }else{
                    hasTerrace = true;
                    //it has a terrace, but don't show
                    // d[key] = '';
                    return
                  }
                }

                if(key === 'exterior_square_feet' && !hasTerrace){
                  //do not show the ext sq feet
                  return
                }

                if(key === 'exterior_square_meters' && !hasTerrace){
                  //do not show the ext sq feet
                  return
                }

                if(key === 'interior_square_feet'){
                  console.log('raw feet: ', d[key]);
                  if(isNaN(d[key])){
                    console.log('int sq ft is NaN already, do nothing')
                  }else{
                    var numberFormatted = new Intl.NumberFormat('en', {
                      maximumFractionDigits: 0
                    }).format(d[key]);
                    // var rounded = Math.round(d[key]);
                    d[key] = numberFormatted;
                    // interiorSqFeet = numberFormatted
                  }
                }

                if(key === 'exterior_square_feet'){
                  console.log('raw feet: ', d[key]);
                  if(isNaN(d[key])){
                    console.log('int sq ft is NaN already, do nothing')
                  }else{
                    var numberFormatted = new Intl.NumberFormat('en', {
                      maximumFractionDigits: 0
                    }).format(d[key]);
                    // var rounded = Math.round(d[key]);
                    d[key] = numberFormatted;
                    // exteriorSqFeet = numberFormatted
                  }
                }

                if(key === 'interior_square_meters'){
                  console.log('raw meters: ', d[key]);

                  if(isNaN(d[key])){
                    console.log('int sq m is already NaN, do nothing');
                  }else{
                    var numberFormatted = new Intl.NumberFormat('en', {
                      maximumFractionDigits: 1
                    }).format(d[key]);
                    // var rounded = Math.round(d[key] * 10) / 10;
                    d[key] = numberFormatted;
                    // interiorSqMeters = numberFormatted;
                  }
                }

                if(key === 'exterior_square_meters'){
                  console.log('raw meters: ', d[key]);

                  if(isNaN(d[key])){
                    console.log('int sq m is already NaN, do nothing');
                  }else{
                    var numberFormatted = new Intl.NumberFormat('en', {
                      maximumFractionDigits: 1
                    }).format(d[key]);
                    // var rounded = Math.round(d[key] * 10) / 10;
                    d[key] = numberFormatted;
                    // exteriorSqMeters = numberFormatted;
                  }
                }

                if(key === 'price'){
                  
                  // if(!d[key].includes('$')){
                  if(isNaN(d[key])){
                    console.log('price is already formatted');
                  }else{
                    var formatter = new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    });

                    var priceFormatted = formatter.format(d[key]);

                    // console.log('new price format: ', priceFormatted);
                    d[key] = priceFormatted;
                    // price = priceFormatted;
                  }
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

  // renderDetails(data){

  //   var newData = formatData(data);
  //   console.log(newData);
  //   return(
  //     Object.keys(newData).map(function(key, index){
  //       var val = newData[key];

  //       return(
  //         <DetailText
  //           title={key}
  //           value={val}
  //           key={index} 
  //         />
  //       )
  //     })
  //   )
  // }
  

  render(){
    return(
      <div>
        {this.renderDetails(this.props.details)}
      </div>
    )
  }
}

export default Details;
