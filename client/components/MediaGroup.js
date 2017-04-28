// import React from 'react';
// import Redux, { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
//
// import data from '../data/media.json';
//
// import TextLink from './TextLink';
// import TextLinkBorder from './TextLinkBorder';
// import RenderNonUnitAssets from './RenderNonUnitAssets';
// import NextPageButton from './NextPageButton';
// import ControlPanel from './ControlPanel';
// import * as folioActions from '../actions/actionCreators';
//
// class MediaGroup extends React.Component {
//   constructor(props){
//     super(props);
//
//     this.selectMedia = this.selectMedia.bind(this);
//     this.changePageIndex = this.changePageIndex.bind(this);
//
//     this.state = {
//       mediaGroup: '',
//       activeButton: {},
//       selectedMediaType: '',
//       pageIndex: 0
//     }
//   }
//
//   componentDidMount(){
//     var mediaGroup = this.state.mediaGroup;
//     // mediaGroup = 'Amenities';
//
//     var tag = this.props.current.currentTag;
//
//     switch(tag){
//       case 'am':
//         console.log(tag);
//         mediaGroup = 'Amenities';
//         break;
//       case 'n':
//         console.log(tag);
//         mediaGroup = 'Neighborhood';
//         break;
//       case 't':
//         console.log(tag);
//         mediaGroup = 'Team';
//         break;
//       default:
//         console.log('default');
//         break;
//     }
//
//     this.setState({mediaGroup: mediaGroup}, function(){
//       // console.log('media group set to ' + mediaGroup);
//     });
//   }
//
//   getMedia(d){
//     var m = {};
//     var _this = this;
//
//     try{
//       Object.keys(d).map(function(key, index){
//         if(d[key].name == _this.state.mediaGroup){
//           m = d[key];
//           console.log(_this.state.mediaGroup + ' media found');
//         }else{
//           // console.log('media not found');
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
//       // console.log(media.length);
//       var isEmpty = this.isItEmpty(media);
//
//       if(!isEmpty){
//         return(
//           <RenderNonUnitAssets
//             pageIndex={this.state.pageIndex}
//             handleClick={this.selectMedia}
//             data={media}
//             activeButton={this.state.activeButton}/>
//         )
//       }
//   }
//
//   isItEmpty(obj){
//     return Object.keys(obj).length === 0;
//   }
//
//   selectMedia(media, type){
//
//     var activeButton = this.state.activeButton;
//     activeButton = media;
//
//     var selectedMediaType = this.state.selectedMediaType;
//     selectedMediaType = type;
//
//     this.setState({
//       activeButton: activeButton,
//       selectedMediaType: selectedMediaType
//     }, function(){
//       console.log('active button: ' + this.state.activeButton.name);
//     });
//
//     var message = {
//       command: 'select',
//       media: media
//     }
//     this.sendControlMessage(message);
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
//   renderControlPanel(){
//     if(this.state.selectedMediaType === 'video'){
//       return(
//          <ControlPanel type='video-controls' handleClick={this.sendControlMessage.bind(this)}/>
//       )
//     }
//     if(this.state.selectedMediaType === 'photo'){
//       return(
//         <ControlPanel type='photo-controls' handleClick={this.sendControlMessage.bind(this)}/>
//       )
//     }
//   }
//
//   sendControlMessage(msg){
//
//     // var msg = {
//     //   'media-group': this.state.mediaGroup,
//     //   'media': this.state.activeButton,
//     //   'command': command
//     // }
//
//     console.log('socket send: ');
//     console.log(msg.command);
//     console.log(msg.media);
//
//   }
//
//   render(){
//     return(
//       <div className='view'>
//         <div className='media-assets-container'>
//           <TextLinkBorder />
//           <div className='media-container-border-overlay'></div>
//           {this.renderAssets(data)}
//         </div>
//         {this.renderControlPanel()}
//         <NextPageButton handleClick={this.changePageIndex} />
//       </div>
//     )
//   }
// }
//
// function mapStateToProps(state){
//   return {
//     folio: state.folio,
//     current: state.current
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return {
//     folioActions: bindActionCreators(folioActions, dispatch)
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(MediaGroup);
