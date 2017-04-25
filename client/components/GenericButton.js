import React from 'react';
import PropTypes from 'prop-types';

class GenericButton extends React.Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div className={this.props.styleClass} onClick={(e) => this.props.action(e)}>
        {this.props.textDisplay}
      </div>
    )
  }
}

GenericButton.propTypes = {
  styleClass: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  textDisplay: PropTypes.string
}

export default GenericButton
