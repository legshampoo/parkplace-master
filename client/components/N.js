import React from 'react'
import { Link } from 'react-router'

import TextLink from './TextLink'
import ViewTitle from './ViewTitle';
import NextPageButton from './NextPageButton';
import ControlPanel from './ControlPanel';
import dashboardData from '../data/controlPanelVideo';

class N extends React.Component {
  render(){
    return(
      <div className='view'>
        <div className='link-container'>
          <div className='link-container-border'></div>
          <TextLink path='/filler' displayText='HISTORIC TRIBECA' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='NEW DOWNTOWN' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='RESTAURANTS AND HOSPITALITY' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='EAST TO WEST' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='STORY X' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='STORY Y' allowAddToFolio={false} />
        </div>
        <ControlPanel dashboardData={dashboardData} type='video-controls'/>
        <NextPageButton />
      </div>
    )
  }
}

export default N
