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
        <h2>1/2</h2>
        <div className='next-page-icon'>
        </div>
      </div>
    )
  }
}

export default NextPageButton;
