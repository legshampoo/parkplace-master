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

      //Rename the incoming tags
      // .toString() needed for actual RFID tags,
      //but not used for dev menu
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

        // if(json.status == 'true'){  //use this line for actual RFID
        if(json.status == 'true'){
          // console.log(json.tag + ' active');
          updateCurrentTag(json.tag);
          var tag = this.props.current.currentTag;
          path = handleNewTag(tag);
          this.context.router.push(path);
          return;
        }else if(json.status == 'false'){
          // console.log(json.tag + ' removed');
          path = handleTagRemoved();
          var unit = '';

          if(json.tag == 'am'){
            unit = 'Amenities';
          }else{
            unit = this.props.current.currentUnit;
          }

          var led_id = getLightingId(unit);
          lightingControl(led_id, false);
          // console.log('pushing to ' + path);
          this.context.router.push(path);
          return;
        }
      }catch(err){
        console.log('Unable to parse, message not formatted as JSON');
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
