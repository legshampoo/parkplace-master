import React from 'react';

class Toggle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isHidden: this.props.isHidden
    }
  }

  toggleHidden(){
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  render(){
    const Child = this.props.child;
    
    return(
      <div className='nav-menu-toggle'>
        <label className='switch'>
          <input
            type='checkbox'
            checked={!this.state.isHidden}
            onChange={this.toggleHidden.bind(this)}
          />
          <div className='slider'></div>
        </label>
        { !this.state.isHidden && <Child /> }
      </div>
    )
  }
}

export default Toggle;
