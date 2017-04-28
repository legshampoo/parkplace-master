import React from 'react';
import PropTypes from 'prop-types';

class NavButton extends React.Component {
  constructor(){
    super();
  }

  onClick(event){
    event.preventDefault();
    // console.log('nav to: ' + this.props.path);
    this.context.router.push(this.props.path)
  }

  render(){
    return(
      <div className={this.props.styleClass} onClick={(e) => this.onClick(e)}>
        <div className='nav-button-text'>
          {this.props.name}
        </div>
        {/* <div className='grid-icon'>

        </div> */}
      </div>
    )
  }
}

NavButton.contextTypes = {
  router: PropTypes.object
}

NavButton.propTypes = {
  styleClass: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}

export default NavButton;
