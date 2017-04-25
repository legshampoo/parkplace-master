// import React from 'react';
// import { Link } from 'react-router';
//
// import data from '../data/media_groups';
//
// import TextLink from './TextLink';
// import TextLinkBorder from './TextLinkBorder';
// import RenderNonUnitAssets from './RenderNonUnitAssets';
// import ViewTitle from './ViewTitle';
// import NextPageButton from './NextPageButton';
// import ControlPanel from './ControlPanel';
// // import dashboardData from '../data/controlPanelVideo';
//
// class N extends React.Component {
//   constructor(props){
//     super(props);
//
//     this.selectMedia = this.selectMedia.bind(this);
//     this.changePageIndex = this.changePageIndex.bind(this);
//
//     this.state = {
//       activeButton: '',
//       pageIndex: 0
//     }
//   }
// 
//   getMedia(d){
//     var m = {};
//
//     try{
//       Object.keys(d).map(function(key, index){
//         if(d[key].name == 'Neighborhood'){
//           m = d[key];
//           console.log('Neighborhood media found');
//         }else{
//           // console.log('not found');
//         }
//       })
//     }catch(err){
//       console.log('errerrerer');
//     }
//
//     return m;
//   }
//
//   renderAssets(d){
//       // var media = d['Amenities'];
//       var media = this.getMedia(d);
//
//       // console.log(media);
//
//       return(
//         <RenderNonUnitAssets pageIndex={this.state.pageIndex} handleClick={this.selectMedia} data={media} activeButton={this.state.activeButton}/>
//       )
//   }
//
//   selectMedia(media){
//     console.log(media);
//     var activeButton = this.state.activeButton;
//     activeButton = media.name;
//
//     this.setState({activeButton: activeButton}, function(){
//       console.log('active button: ' + this.state.activeButton);
//     });
//   }
//
//   changePageIndex(val){
//     var index = this.state.pageIndex + val;
//
//     if(index < 0){
//       index = 0;
//     }
//     console.log(index);
//
//     var media = this.getMedia(data);
//
//     //if index is greater than number of assets rounded up
//     //to show the remainders
//     if((index + 1) > Math.ceil((media.photos.length + media.videos.length) / 6)){
//       console.log('GREATER');
//       index = index - 1;
//     }
//
//     this.setState({pageIndex: index});
//   }
//
//   render(){
//     return(
//       <div className='view'>
//         <div className='media-assets-container'>
//           <TextLinkBorder />
//           <div className='media-container-border-overlay'></div>
//           {this.renderAssets(data)}
//           {/* <TextLink path='/filler' displayText='HISTORIC TRIBECA' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='NEW DOWNTOWN' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='RESTAURANTS AND HOSPITALITY' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='EAST TO WEST' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='STORY X' allowAddToFolio={false} />
//           <TextLink path='/filler' displayText='STORY Y' allowAddToFolio={false} /> */}
//         </div>
//         <ControlPanel dashboardData={dashboardData} type='video-controls'/>
//         <NextPageButton handleClick={this.changePageIndex}/>
//       </div>
//     )
//   }
// }
//
// export default N
