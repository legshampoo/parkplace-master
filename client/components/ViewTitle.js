import React from 'react'

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
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired
}

export default ViewTitle
