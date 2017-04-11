import React from 'react';

import data from '../data/media_groups.json';

import TextLink from './TextLink';
import TextLinkBorder from './TextLinkBorder';
import RenderNonUnitAssets from './RenderNonUnitAssets';
import NextPageButton from './NextPageButton';
import ControlPanel from './ControlPanel';
import dashboardData from '../data/controlPanelImage';

class Am extends React.Component {
  constructor(props){
    super(props);

    this.selectMedia = this.selectMedia.bind(this);
    this.changePageIndex = this.changePageIndex.bind(this);

    this.state = {
      activeButton: '',
      pageIndex: 0
    }
  }

  getMedia(d){
    var m = {};

    try{
      Object.keys(d).map(function(key, index){
        if(d[key].name == 'Amenities'){
          m = d[key];
          console.log('amenities media found');
        }else{
          // console.log('not found');
        }
      })
    }catch(err){
      console.log('errerrerer');
    }

    return m;
  }

  renderAssets(d){
      // var media = d['Amenities'];
      var media = this.getMedia(d);

      // console.log(media);

      return(
        <RenderNonUnitAssets pageIndex={this.state.pageIndex} handleClick={this.selectMedia} data={media} activeButton={this.state.activeButton}/>
      )
  }

  selectMedia(media){
    console.log(media);
    var activeButton = this.state.activeButton;
    activeButton = media.name;

    this.setState({activeButton: activeButton}, function(){
      console.log('active button: ' + this.state.activeButton);
    });
  }

  changePageIndex(val){
    var index = this.state.pageIndex + val;

    if(index < 0){
      index = 0;
    }
    console.log(index);

    var media = this.getMedia(data);

    //if index is greater than number of assets rounded up
    //to show the remainders
    if((index + 1) > Math.ceil((media.photos.length + media.videos.length) / 6)){
      console.log('GREATER');
      index = index - 1;
    }

    this.setState({pageIndex: index});
  }

  render(){
    return(
      <div className='view'>
        <div className='media-assets-container'>
          <TextLinkBorder />
          <div className='media-container-border-overlay'></div>
          {this.renderAssets(data)}
        </div>
        <ControlPanel dashboardData={dashboardData} type='photo-controls'/>
        <NextPageButton handleClick={this.changePageIndex} />
      </div>
    )
  }
}

export default Am
