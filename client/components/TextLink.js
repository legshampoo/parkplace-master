import React from 'react';
import PropTypes from 'prop-types';

import AddToFolioButton from './AddToFolioButton';

class TextLink extends React.Component {
  constructor(props){
    super(props)
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
  displayText: PropTypes.string.isRequired,
  styleClass: PropTypes.string.isRequired
}

export default TextLink
