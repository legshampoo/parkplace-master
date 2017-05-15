import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tagActions from '../actions/actionCreators';
import { updateTagStatus, updateCurrentTag, updateCurrentUnit } from '../actions/actionCreators';

import { handleNewTag, handleTagRemoved } from './RouteLogic';
import { socketConnectCMS } from './MessageHandler';
import { lightingControl } from './LightingControls';
import { getLightingId } from './AssetManager';

const io = require('socket.io-client');

class EventHandler extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      penthouseA: 'PHA',
      penthouseB: 'PHB'
    }
  }

  componentDidMount(){

    // var sock = io();
    //
    // sock.on('connect', function(){
    //   console.log('socket ID: ' + sock.id);
    //   sock.emit('msg', { clientMessage: 'connecting...' });
    //
    // });
    // sock.on('message', function() {
    //   console.log('new data: ');
    // });

    socketConnectCMS();

    const webSocketPort = 5560;
    this.socket = new WebSocket('ws://localhost:' + webSocketPort);
    this.socket.onopen = function(event){
      console.log('Websocket connecting to server: ' + event.currentTarget.URL);
    }

    //-----------------------
    //Incoming Message From RFID
    //-----------------------
    this.socket.onmessage = event => {
      var json = JSON.parse(event.data);
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

        updateTagStatus(json.tag, json.status);

        var path = '/';

        if(json.status == 'true'){
          updateCurrentTag(json.tag);

          var tag = this.props.current.currentTag;
          path = handleNewTag(tag);

          //go to tag path
          this.context.router.push(path);
          return;
        }else if(json.status == 'false'){
          var unit = '';

          if(json.tag === 'am'){
            unit = 'Amenities';
          }
          if(json.tag === 'PHA'){
            unit = 'PHA';
          }
          if(json.tag === 'PHB'){
            unit = 'PHB';
          }
          if(json.tag === 'ap1' || json.tag === 'ap2'){
            //get the current Unit before clearing it
            unit = this.props.current.currentUnit;
          }

          console.log('turning off LED for unit: ' + unit);

          var led_id = getLightingId(unit);

          //send command to turn off LED
          lightingControl(led_id, false);

          path = handleTagRemoved();
          // var unit = '';

          // if(json.tag == 'am'){
          //   unit = 'Amenities';
          // }else{
          //   unit = this.props.current.currentUnit;
          // }


          //go to path for any remaining token
          this.context.router.push(path);
          return;
        }
      }catch(err){
        // console.log('Unable to parse, message not formatted as JSON');
      }
    }
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
