import React from 'react';

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
  styleClass: React.PropTypes.string.isRequired
}

export default RemoveUnit;
