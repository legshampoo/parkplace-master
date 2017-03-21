import React from 'react'

class NavButton extends React.Component {
  constructor(){
    super();
  }

  onClick(event){
    event.preventDefault();
    console.log('nav to: ' + this.props.path);
    this.context.router.push(this.props.path)
  }

  render(){
    return(
      <div className={this.props.styleClass} onClick={(e) => this.onClick(e)}>
        <div className='nav-button-text'>
          {this.props.name}
        </div>
        <div className='grid-icon'></div>
      </div>
    )
  }
}

NavButton.contextTypes = {
  router: React.PropTypes.object
}

NavButton.propTypes = {
  styleClass: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired
}

export default NavButton;
