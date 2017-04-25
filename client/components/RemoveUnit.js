import React from 'react';
import PropTypes from 'prop-types';

class RemoveUnit extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div className={this.props.styleClass} onClick={() => this.props.onClick(this)}>
        <div className='remove-unit-icon'>
          X
        </div>
      </div>
    )
  }
}

RemoveUnit.propTypes = {
  styleClass: PropTypes.string.isRequired
}

export default RemoveUnit;
