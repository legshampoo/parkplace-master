import React from 'react';
import PropTypes from 'prop-types';

class ViewTitle extends React.Component {
  render(){
    return(
      <div className='view-title'>
        <div>{this.props.title}</div>
        <div>{this.props.subtitle}</div>
      </div>
    )
  }
}

ViewTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default ViewTitle
