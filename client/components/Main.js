import React from 'react';
import { Link } from 'react-router';

// import Toggle from './Toggle';
import EventHandler from './EventHandler';
// import DevMenu from './DevMenu';
import ControlPanel from './ControlPanel';

class Main extends React.Component{
  render(){
    return(
      <div className='main'>
        {/* <Toggle isHidden={false} child={DevMenu}/> */}
        <EventHandler />
        {/* <ControlPanel /> */}
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}

export default Main;
