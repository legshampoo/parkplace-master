import React from 'react';

class NextPageButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='next-page-button'>
        <div className='next-page-icon' onClick={() => this.props.handleClick(-1)}>
          &#60;
        </div>
        <div className='next-page-icon' onClick={() => this.props.handleClick(1)}>
          &#62;
        </div>
      </div>
    )
  }
}

export default NextPageButton;
