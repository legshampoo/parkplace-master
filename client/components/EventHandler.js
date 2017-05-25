import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tagActions from '../actions/actionCreators';
import { updateTagStatus, updateCurrentTag, updateCurrentUnit, updateResidenceAssets, updateMediaAssets } from '../actions/actionCreators';
import * as browserHistory from './History';

import { handleNewTag, handleTagRemoved, checkTagsLeft } from './RouteLogic';
import { socketConnectCMS, openSocketCMS, crestronLightsOn, crestronLightsOff, sendHeartbeat, heartbeat } from './MessageHandler';
import { lightingControl } from './LightingControls';
import { getLightingId } from './AssetManager';


const io = require('socket.io-client');

class EventHandler extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

    socketConnectCMS();
    // sendHeartbeat();

    var options = {
      reconnection: true,
      reconnectionDelay: 1000
      // timeout: 5000
    }
    var sock = io.connect('http://localhost:7770', options);

    sock.on('connect', d => {
      console.log('Socket CONNECTED to Localhost');
      sock.emit('request-assets', {
        type: 'residences'
      });
      sock.emit('request-assets', {
        type: 'media'
      });
    });

    var heartbeatInterval = 10000;
    setInterval(function(){
      // var pingMessage = 'browser client heartbeat';
      // sock.emit('client-ping', {
      //   data: pingMessage
      // });
      sock.emit('crestron-command', JSON.stringify(heartbeat));
    }, heartbeatInterval);

    sock.on('echo', d => {
      console.log(d);
    })

    sock.on('connection-established', d => {
      console.log(d);
    });

    sock.on('server-heartbeat', d => {
      console.log(d);
    });

    sock.on('residence-assets', d => {
      console.log('RESIDENCE ASSETS UPDATED');
      updateResidenceAssets(d);
    });

    sock.on('media-assets', d => {
      console.log('MEDIA ASSETS UPDATED');
      updateMediaAssets(d);
    });

    sock.on('message', d => {
      var json = JSON.parse(d.data);
      console.log(json);

      try{
        switch(json.tag.toString()){
          case '1000': json.tag = 'ap1'; break;
          case '2000': json.tag = 'ap2'; break;
          case '3000': json.tag = 'am'; break;
          case '4000': json.tag = 'n'; break;
          case '5000': json.tag = 'PHA'; break;
          case '6000': json.tag = 'PHB'; break;
          case '7000': json.tag = 't'; break;
        }

        updateTagStatus(json.tag, json.status)

        // var path = '/';

        if(json.status === 'true'){
          //send lighting command to crestron
          console.log('Crestron ON');
          // sock.emit('crestron-command', {
          //   data: JSON.stringify(crestronLightsOn)
          // });
          sock.emit('crestron-command', JSON.stringify(crestronLightsOn));
          // console.log(json.status);
          var tag = json.tag;
          // console.log(`tag: ${tag}`);

          updateCurrentTag(tag);

          // var tag = this.props.current.currentTag;

          var path = handleNewTag(tag);
          // console.log(`path: ${path}`);
          // this.context.router.push(path);
          browserHistory.push(path);

          return;
        }else if(json.status === 'false'){
          // console.log(`${json.tag}: ${json.status}`);
          var unitLED = '';

          if(json.tag === 'am'){
            unitLED = 'Amenities';
          }else if(json.tag === 'PHA'){
            unitLED = 'PHA';
          }else if(json.tag === 'PHB'){
            unitLED = 'PHB';
          }else if(json.tag === 'ap1'){
            //get the current Unit before clearing it
            unitLED = this.props.folio.ap1;
            console.log(`${unitLED}`)
          }else if(json.tag === 'ap2'){
            //get the current Unit before clearing it
            unitLED = this.props.folio.ap2;
            console.log(`${unitLED}`)
          }


          var led_id = getLightingId(unitLED);

          if(led_id != 0){
            console.log(`${unitLED} LED OFF: ${led_id}`);
            //send command to turn off LED
            lightingControl(led_id, false);
          }else{
            //do nothing
          }


          var path = handleTagRemoved(function(){
            console.log('Crestron OFF');
            // sock.emit('crestron-command', {
            //   data: JSON.stringify(crestronLightsOff)
            // });
            sock.emit('crestron-command', JSON.stringify(crestronLightsOff));
          });

          // var isTagStillActive = checkTagsLeft();
          //
          // if(isTagStillActive){
          //   console.log('tag is still active');
          // }else{
          //   console.log('tag IS NOT still active');
          // }


          //go to path for any remaining token
          // this.context.router.push(path);
          // console.log('pushing');
          browserHistory.push(path);
          return;
        }
      }catch(err){
        // console.log('Unable to parse, message not formatted as JSON');
      }
    });
  }

  render(){
    return(
      <div className='event-handler'>
      </div>
    )
  }
}

EventHandler.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps(state){
  return {
    tags: state.tags,
    folio: state.folio,
    current: state.current,
    residences: state.residences,
    media: state.media
  }
}

function mapDispatchToProps(dispatch){
  return {
    tagActions: bindActionCreators(tagActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventHandler);
