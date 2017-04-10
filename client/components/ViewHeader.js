import React from 'react'

class ViewHeader extends React.Component {
  constructor(){
    super();
  }
  render(){
    return(
      <div className='view-header'>
        <div className='view-header-text'>
          {/* <div className='view-header-title'>
            RESIDENCE
          </div> */}
          <div className='view-header-unit'>
            {this.props.unitId}
          </div>
        </div>
      </div>
    )
  }
}

ViewHeader.propTypes = {
  unitId: React.PropTypes.string.isRequired
}

export default ViewHeader;
