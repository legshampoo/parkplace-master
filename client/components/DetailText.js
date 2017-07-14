import React from 'react';


class DetailText extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='compare-details-text'>
          {this.props.title} : {this.props.value}
      </div>
    )
  }
}

export default DetailText;
