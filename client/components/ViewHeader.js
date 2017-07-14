import React from 'react';
import PropTypes from 'prop-types';

class ViewHeader extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    var styleClass = '';
    if(this.props.compareMode){
      styleClass = 'view-header-text-compare';
    }else{
      styleClass = 'view-header-text';
    }
    return(
      <div className='view-header'>
      {/* <div className={styleClass}> */}
        {/* <div className='view-header-text'> */}
          <div className={styleClass}>
          {this.props.unitId}
        </div>
      </div>
    )
  }
}

ViewHeader.propTypes = {
  unitId: PropTypes.string.isRequired,
  compareMode: PropTypes.bool.isRequired
}

export default ViewHeader;
