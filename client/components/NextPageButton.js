import React from 'react';

class NextPageButton extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // console.log(`showLeft: ${this.props.showLeft}`);
    // console.log(`showRight: ${this.props.showRight}`);
  }

  render(){
    return(
      <div className='next-page-button'>
        {this.props.showLeft ?
          <div className='next-page-icon' onClick={() => this.props.handleClick(-1)}>
            &#60;
          </div>
          :
          <div className='next-page-icon' onClick={() => this.props.handleClick(-1)}>
            {/* &#60; */}
          </div>
        }

        {this.props.showRight ?
          <div className='next-page-icon' onClick={() => this.props.handleClick(1)}>
            &#62;
          </div>
          :
          <div className='next-page-icon' onClick={() => this.props.handleClick(1)}>
            {/* &#62; */}
          </div>
        }
      </div>
    )
  }
}

export default NextPageButton;
