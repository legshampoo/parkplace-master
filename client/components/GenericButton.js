import React from 'react'

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
  styleClass: React.PropTypes.string.isRequired,
  action: React.PropTypes.func.isRequired,
  textDisplay: React.PropTypes.string
}

export default GenericButton
