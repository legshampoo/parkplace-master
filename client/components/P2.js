import React from 'react'

import TextLink from './TextLink'
import ViewHeader from './ViewHeader';
import NextPageButton from './NextPageButton';
import RemoveUnit from './RemoveUnit';
import AddToFolioButton from './AddToFolioButton';
import ControlPanel from './ControlPanel';

class P2 extends React.Component {
  constructor(){
    super();
    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack(d){
    console.log('GO BACK - SHOULD NOT BE HERE, JUST REMOVE TOKEN');
    // this.context.router.goBack();
  }

  render(){
    return(
      <div className='view'>
        <div className='link-container'>
          <div className='link-container-border'></div>
          {/* <TextLink path='/filler' displayText='FLOORPLAN' allowAddToFolio={true} />
          <TextLink path='/filler' displayText='VIEW' allowAddToFolio={true} />
          <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={true} />
          <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={true} />
          <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={true} />
          <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={true} /> */}
        </div>
        <ViewHeader unitId={'2W'}/>
        <AddToFolioButton styleClass='add-to-folio-button' />
        <RemoveUnit styleClass='remove-unit-button-center' onClick={this.navigateBack.bind(this)}/>
        <NextPageButton />
        <ControlPanel type='photo-controls' />
      </div>
    )
  }
}

export default P2
