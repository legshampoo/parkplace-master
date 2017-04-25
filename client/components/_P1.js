// import React from 'react'
// import TextLink from './TextLink';
//
// import data from '../data/data.json';
//
// import ViewHeader from './ViewHeader';
// import NextPageButton from './NextPageButton';
// import RemoveUnit from './RemoveUnit';
// import ControlPanel from './ControlPanel';
// import AddToFolioButton from './AddToFolioButton';
//
// class P1 extends React.Component {
//   constructor(){
//     super();
//     this.navigateBack = this.navigateBack.bind(this);
//
//     this.state = {
//       activeButton: ''
//     }
//   }
//
//   componentDidMount(){
//
//   }
//
//   navigateBack(d){
//     console.log('GO BACK - SHOULD NOT BE HERE, JUST REMOVE TOKEN');
//   }
//
//   getUnitId(){
//     var unitId = this.props.current.currentUnit;
//     console.log('unit: ' + unitId);
//
//     //if unit is PHA or PHB, insert a 'space' char
//     //so it will match with the data.json
//     if(unitId == 'PHA' || unitId == 'PHB'){
//       unitId = unitId.slice(0, 2) + " " + unitId.slice(2);
//     }
//
//     return unitId;
//   }
//
//   render(){
//     return(
//       <div className='view'>
//         <div className='link-container'>
//           <div className='link-container-border'></div>
//           {/* <TextLink path='/filler' displayText='FLOORPLAN' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='VIEW' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='RENDERING' allowAddToFolio={false} /> */}
//         </div>
//         <ViewHeader unitId={'64E'}/>
//         <AddToFolioButton styleClass='add-to-folio-button' />
//         <RemoveUnit styleClass='remove-unit-button-center' onClick={this.navigateBack.bind(this)}/>
//         <NextPageButton />
//         <ControlPanel type='blank' />
//       </div>
//     )
//   }
// }
//
// export default P1
