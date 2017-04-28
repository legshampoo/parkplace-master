import React from 'react';
import PropTypes from 'prop-types';

class TextLink extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className={this.props.styleClass} onClick={() => this.props.handleClick()}>
        <div className='text-link-text'>{this.props.displayText}</div>
      </div>
    )
  }
}

TextLink.propTypes = {
  displayText: PropTypes.string.isRequired,
  styleClass: PropTypes.string.isRequired
}

export default TextLink
