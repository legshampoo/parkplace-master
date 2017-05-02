// import React from 'react';
//
// import TextLink from './TextLink';
// import { assetSelection } from './MessageHandler';
//
// //pass the className as a prop, based on what is selected
// class RenderNonUnitAssets extends React.Component {
//   constructor(props){
//     super(props);
//     // console.log(props);
//
//     this.renderVideoAssets = this.renderVideoAssets.bind(this);
//     this.renderPhotoAssets = this.renderPhotoAssets.bind(this);
//
//     var count = 0;
//   }
//
//   renderVideoAssets(d){
//     var _this = this;
//     // this.setState({count: 0});
//     this.count = 0;
// 
//     // console.log(d);
//     //first render all video assets, using _this.count to keep track of
//     //how many have been loaded.  After videos, we then move on to photo assets
//     return(
//       d.videos.map(function(media,index){
//         if((_this.props.pageIndex * 6) <= index && index < ((_this.props.pageIndex + 1) * 6)){
//           // this.setState({count: count++});
//           _this.count++;
//           var mediaType = 'video';
//           // var msg = assetSelection;
//           // console.log(_this.props.activeButton);
//           // console.log(media.name);
//           return(
//             <TextLink
//               handleClick={_this.props.handleClick.bind(this, media, mediaType)}
//               mediaType={mediaType}
//               activeButton={_this.props.activeButton}
//               id={media.name}
//               key={index}
//               path={media.wall}
//               displayText={media.name}
//               styleClass={media.name === _this.props.activeButton.name ? 'media-asset-button-active' : 'media-asset-button' }
//             />
//           )
//         }
//       })
//     )
//   }
//
//   renderPhotoAssets(d){
//     var _this = this;
//
//     return(
//       //render photo assets, starting from where count left off in video assets
//       d.photos.map(function(media,index){
//         if((_this.props.pageIndex * 6) <= index && index < ((_this.props.pageIndex + 1) * 6) - (_this.count)){
//           // this.setState({count: count++});
//           _this.count++;
//           // console.log(_this.count);
//           var mediaType = 'photo';
//           // console.log(_this.props.activeButton);
//           // console.log(media.name);
//           return(
//             <TextLink
//               handleClick={_this.props.handleClick.bind(this, media, mediaType)}
//               mediaType='photo'
//               activeButton={_this.props.activeButton}
//               id={media.name}
//               key={index}
//               path={media.wall}
//               displayText={media.name}
//               styleClass={media.name === _this.props.activeButton.name ? 'media-asset-button-active' : 'media-asset-button' }
//             />
//           )
//         }
//       })
//     )
//
//   }
//
//   emptyClickHandler(){
//     console.log('BUTTON EMPTY - NO ACTION');
//   }
//
//   renderBlankAssets(d){
//
//     var _this = this;
//     var emptyMedia = {
//       name: '',
//       path: 'empty-path'
//     };
//
//     var empty = [];
//
//     for(var i = 6; i > 6 - _this.count; i--){
//       empty.push(emptyMedia);
//     }
//     return(
//       empty.map((media, index) => (
//           <TextLink
//             handleClick={_this.emptyClickHandler}
//             mediaType={_this.props.mediaType}
//             activeButton={_this.props.activeButton}
//             id={media.name}
//             key={index}
//             path={media.path}
//             displayText={media.name}
//             styleClass={'media-asset-button'}
//           />
//         )
//       )
//     )
//   }
//
//   render(){
//     return(
//       <div className='media-container-inner-wrapper'>
//           {this.renderVideoAssets(this.props.data)}
//           {this.renderPhotoAssets(this.props.data)}
//           {this.renderBlankAssets(this.props.data)}
//         </div>
//     )
//   }
// }
//
//
//
// export default RenderNonUnitAssets
