import React from 'react';
import PropTypes from 'prop-types';

import TextLink from './TextLink';

class RenderAssets extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    var count = 0;
  }

  renderAssets(d){
    var _this = this;
    this.count = 0;
    // console.log('here');
    // console.log(d);
    return(
      // d.map((media, index) => (
      d.map(function(media, index){
        if((_this.props.pageIndex * 6) <= index && index < (_this.props.pageIndex + 1) * 6){
          _this.count++;
          return(
            <TextLink
              handleClick={_this.props.handleClick.bind(this, media, _this.props.mediaType)}
              mediaType={_this.props.mediaType}
              activeButton={_this.props.activeButton}
              id={media.name}
              key={index}
              path={media.pan}
              displayText={media.name}
              styleClass={media.name === _this.props.activeButton.name ? 'media-asset-button-active' : 'media-asset-button' }
            />
          )
        }
      })
      // ))
    )
  }

  emptyClickHandler(){
    console.log('empty button, do nothing');
  }

  renderBlankAssets(_count){
    // console.log('rendering blanks, count: ' + (6 - _count));
    var _this = this;
    var emptyMedia = {
      name: '',
      path: 'empty-path'
    };

    var empty = [];

    for(var i = 0; i < 6 - _count; i++){
      empty.push(emptyMedia);
    }

    return(
      empty.map((media, index) => (
          <TextLink
            handleClick={_this.emptyClickHandler}
            mediaType={_this.props.mediaType}
            activeButton={_this.props.activeButton}
            id={media.name}
            key={index}
            path={media.path}
            displayText={media.name}
            styleClass={'media-asset-button'}
          />
        )
      )
    )
  }

  render(){
    return(
      <div className='media-container-inner-wrapper'>
        {this.renderAssets(this.props.data)}
        {this.renderBlankAssets(this.count)}
      </div>
    )
  }
}

RenderAssets.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  activeButton: PropTypes.object.isRequired,
  mediaType: PropTypes.string.isRequired
}


export default RenderAssets
