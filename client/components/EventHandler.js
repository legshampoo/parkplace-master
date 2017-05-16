import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tagActions from '../actions/actionCreators';
import { updateTagStatus, updateCurrentTag, updateCurrentUnit } from '../actions/actionCreators';

import { handleNewTag, handleTagRemoved } from './RouteLogic';
import { socketConnectCMS, openSocketCMS } from './MessageHandler';
import { lightingControl } from './LightingControls';
import { getLightingId } from './AssetManager';

const io = require('socket.io-client');

class EventHandler extends React.Component {
  constructor(props){
    super(props);
    // console.log(props);
    this.state = {
      penthouseA: 'PHA',
      penthouseB: 'PHB'
    }
  }

  componentDidMount(){

    socketConnectCMS();
    // openSocketCMS();

    var options = {
      reconnection: true,
      reconnectionDelay: 1000,
      timeout: 5000
    }
    var sock = io.connect('http://localhost:7770', options);

    sock.on('connect', d => {
      console.log('io.on connect: ' + d);
    });

    sock.emit('ping', { data: 'browser client ping' });

    sock.on('echo', d => {
      console.log('server echo:');
      console.log(d);
    })

    sock.on('connection-established', d => {
      console.log(d);
    });

    sock.on('ping', d => {
      console.log(d);
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

        var path = '/';

        if(json.status == 'true'){
          updateCurrentTag(json.tag);

          var tag = this.props.current.currentTag;

          path = handleNewTag(tag);

          this.context.router.push(path);
          console.log('1');
          return;
        }else if(json.status == 'false'){
          var unitLED = '';

          if(json.tag === 'am'){
            unitLED = 'Amenities';
          }
          if(json.tag === 'PHA'){
            unitLED = 'PHA';
          }
          if(json.tag === 'PHB'){
            unitLED = 'PHB';
          }
          if(json.tag === 'ap1' || json.tag === 'ap2'){
            //get the current Unit before clearing it
            unitLED = this.props.current.currentUnit;
          }

          // console.log('turning off LED for unit: ' + unit);

          var led_id = getLightingId(unitLED);

          //send command to turn off LED
          lightingControl(led_id, false);

          path = handleTagRemoved();

          //go to path for any remaining token
          this.context.router.push(path);
          return;
        }
      }catch(err){
        // console.log('Unable to parse, message not formatted as JSON');
      }
    });

    // socketConnectCMS();

    // const webSocketPort = 5560;
    // this.socket = new WebSocket('ws://localhost:' + webSocketPort);
    // this.socket.onopen = function(event){
    //   console.log('Websocket connecting to server: ' + event.currentTarget.URL);
    // }
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
    current: state.current
  }
}

function mapDispatchToProps(dispatch){
  return {
    tagActions: bindActionCreators(tagActions, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventHandler);
