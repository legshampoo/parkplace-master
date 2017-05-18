import React from 'react';
import PropTypes from 'prop-types';

class ViewHeader extends React.Component {
  constructor(){
    super();
  }
  render(){
    return(
      <div className='view-header'>
        <div className='view-header-text'>
          {this.props.unitId}
        </div>
      </div>
    )
  }
}

ViewHeader.propTypes = {
  unitId: PropTypes.string.isRequired
}

export default ViewHeader;
