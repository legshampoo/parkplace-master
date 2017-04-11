import React from 'react';

import TextLink from './TextLink';

//pass the className as a prop, based on what is selected
class RenderNonUnitAssets extends React.Component {
  constructor(props){
    super(props);
    console.log(props);

    this.renderVideoAssets = this.renderVideoAssets.bind(this);
    this.renderPhotoAssets = this.renderPhotoAssets.bind(this);

    // var { count } = 0;
    var count = 0;
  }

  renderVideoAssets(d){
    var _this = this;
    // this.setState({count: 0});
    this.count = 0;

    //first render all video assets, using _this.count to keep track of
    //how many have been loaded.  After videos, we then move on to photo assets
    return(
      d.videos.map(function(media,index){
        if((_this.props.pageIndex * 6) <= index && index < ((_this.props.pageIndex + 1) * 6)){
          // this.setState({count: count++});
          _this.count++;
          console.log(_this.count);
          return(
            <TextLink
              handleClick={_this.props.handleClick.bind(this, media)}
              activeButton={_this.props.activeButton}
              id={media.name}
              key={index}
              path={media.wall}
              displayText={media.name}
              styleClass={media.name === _this.props.activeButton ? 'media-asset-button-active' : 'media-asset-button' }
            />
          )
        }
      })
    )
  }

  renderPhotoAssets(d){
    var _this = this;

    return(
      //render photo assets, starting from where count left off in video assets
      d.photos.map(function(media,index){
        if((_this.props.pageIndex * 6) <= index && index < ((_this.props.pageIndex + 1) * 6) - (_this.count)){
          // this.setState({count: count++});
          // _this.count++;
          // console.log(_this.count);
          return(
            <TextLink
              handleClick={_this.props.handleClick.bind(this, media)}
              activeButton={_this.props.activeButton}
              id={media.name}
              key={index}
              path={media.wall}
              displayText={media.name}
              styleClass={media.name === _this.props.activeButton ? 'media-asset-button-active' : 'media-asset-button' }
            />
          )
        }
      })
    )

  }

  render(){
    return(
      <div className='media-container-inner-wrapper'>
          {this.renderVideoAssets(this.props.data)}
          {this.renderPhotoAssets(this.props.data)}
        </div>
    )
  }
}



export default RenderNonUnitAssets
