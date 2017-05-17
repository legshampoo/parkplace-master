import React from 'react';

import TextLink from './TextLink';
import { assetSelection } from './MessageHandler';
import { combineAssets } from './AssetManager';

class RenderAssets extends React.Component {
  constructor(props){
    super(props);

    this.renderAssets = this.renderAssets.bind(this);

    this.counter = 0;

  }

  emptyClickHandler(){
    // console.log('BUTTON EMPTY - NO ACTION');
  }

  renderAssets(){
    var _this = this;

    var data = combineAssets(this.props.data, this.props.type);

    return(
      data.map(function(media,index){
        if((_this.props.pageIndex * 6) <= index && index < ((_this.props.pageIndex + 1) * 6)){
          var mediaType = media.type;
          return(
            <TextLink
              handleClick={mediaType === 'video' || mediaType === 'photo' ? _this.props.handleClick.bind(this, media, mediaType) : _this.emptyClickHandler}
              mediaType={mediaType}
              selectedMedia={_this.props.selectedMedia}
              id={media.name}
              key={index}
              // path={media.wall}
              displayText={media.name}
              styleClass={media.name === _this.props.selectedMedia.name ? 'media-asset-button-active' : (media.name === '' ? 'media-asset-button-blank' : 'media-asset-button') }
            />
          )
        }
      })
    )
  }

  render(){
    return(
      <div className='media-container-inner-wrapper'>
          {this.renderAssets()}
        </div>
    )
  }
}



export default RenderAssets;
