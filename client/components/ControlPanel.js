import React from 'react';
import data from '../data/controlPanel';

import ControlGroup from './ControlGroup'

class ControlPanel extends React.Component {
  constructor(){
    super();
  }

  createGroup(group){
    return(
      <ControlGroup key={group.name} data={group} />
    )
  }

  createGroups(groups){
    return groups.map(this.createGroup);
  }

  render(){
    return(
      <div className='controlPanel'>
        {this.createGroups(data.groups)}
      </div>
    )
  }
}

export default ControlPanel;
