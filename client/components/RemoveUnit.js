import React from 'react';

class RemoveUnit extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div className={this.props.styleClass} onClick={() => this.props.onClick(this)}>
        <div className='remove-unit-icon'>
          <h1>X</h1>
        </div>
      </div>
    )
  }
}

RemoveUnit.propTypes = {
  styleClass: React.PropTypes.string.isRequired
}

export default RemoveUnit;
