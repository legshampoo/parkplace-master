import React from 'react';

class NextPageButton extends React.Component{
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    console.log('Next Page Clicked');
  }

  render(){
    return(
      <div className='next-page-button' onClick={() => this.onClick()}>
        <div className='next-page-icon'>
          &#60;
        </div>
        <div className='next-page-icon'>
          &#62;
        </div>
      </div>
    )
  }
}

export default NextPageButton;
