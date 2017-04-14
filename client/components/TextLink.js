import React from 'react';

import AddToFolioButton from './AddToFolioButton';

class TextLink extends React.Component {
  constructor(props){
    super(props)
    // console.log(props);
  }

  render(){
    return(
      <div className={this.props.styleClass} onClick={() => this.props.handleClick()}>
        <h2 className='text-link-text'>{this.props.displayText}</h2>
      </div>
    )
  }
}

TextLink.propTypes = {
  // path: React.PropTypes.string.isRequired,
  displayText: React.PropTypes.string.isRequired,
  styleClass: React.PropTypes.string.isRequired
}

export default TextLink
