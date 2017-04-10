import React from 'react'

import TextLink from './TextLink'
import NextPageButton from './NextPageButton';
import ControlPanel from './ControlPanel';
import dashboardData from '../data/controlPanelImage';

class Am extends React.Component {
  render(){
    return(
      <div className='view'>
        <div className='link-container'>
          <div className='link-container-border'></div>
          <TextLink path='/filler' displayText='ARRIVAL' allowAddToFolio={false}/>
          <TextLink path='/filler' displayText='LOBBY' allowAddToFolio={false}/>
          <TextLink path='/filler' displayText='LOBBY LOUNGE' allowAddToFolio={false}/>
          <TextLink path='/filler' displayText='FITNESS' allowAddToFolio={false}/>
          <TextLink path='/filler' displayText='POOL' allowAddToFolio={false}/>
          <TextLink path='/filler' displayText='CHILDRENS PLAYROOM' allowAddToFolio={false}/>
        </div>
        <ControlPanel dashboardData={dashboardData} type='photo-controls'/>
        <NextPageButton />
      </div>
    )
  }
}

export default Am
