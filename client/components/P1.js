import React from 'react'
import TextLink from './TextLink'

import ViewHeader from './ViewHeader';
import NextPageButton from './NextPageButton';
import RemoveUnit from './RemoveUnit';
import ControlPanel from './ControlPanel';
import AddToFolioButton from './AddToFolioButton';

class P1 extends React.Component {
  constructor(){
    super();
    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack(d){
    console.log('GO BACK - SHOULD NOT BE HERE, JUST REMOVE TOKEN');
  }

  render(){
    return(
      <div className='view'>
        <div className='link-container'>
          <div className='link-container-border'></div>
          <TextLink path='/filler' displayText='FLOORPLAN' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='VIEW' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={false} />
          <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={false} />
        </div>
        <ViewHeader unitId={'64E'}/>
        <AddToFolioButton styleClass='add-to-folio-button' />
        <RemoveUnit styleClass='remove-unit-button-center' onClick={this.navigateBack.bind(this)}/>
        <NextPageButton />
        <ControlPanel type='blank' />
      </div>
    )
  }
}

export default P1
