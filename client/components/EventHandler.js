import React from 'react';
import PropTypes from 'prop-types';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tagActions from '../actions/actionCreators';
import { updateTagStatus, updateCurrentTag, updateCurrentUnit } from '../actions/actionCreators';

// var getData = require('./RequestData');

class EventHandler extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      penthouseA: 'PHA',
      penthouseB: 'PHB'
    }
  }

  componentDidMount(){
    // getData.getResidenceData();
    // getData.getNonResidenceData();

    const webSocketPort = 5560;
    this.socket = new WebSocket('ws://localhost:' + webSocketPort);
    this.socket.onopen = function(event){
      console.log('User Interface WebSocket connected to: ' + event.currentTarget.URL);
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
          case '5000': json.tag = 'p1'; break;
          case '6000': json.tag = 'p2'; break;
          case '7000': json.tag = 't'; break;
          case '8000': json.tag = 'a'; break;
        }

        updateTagStatus(json.tag, json.status);

        var path = '/';

        //if the status is true
        // if(json.status == 'true'){  //use this line for actual RFID
        if(json.status == true){
          // console.log('tag is TRUE');
          updateCurrentTag(json.tag);

          path = path + json.tag;

          const folioTags = ['ap1', 'ap2'];
          const isFolioTag = folioTags.includes(json.tag);
          // console.log('isFolioTag: ' + isFolioTag);

          var unitRouteHandler = false;

          if(isFolioTag){
            console.log('folio tag detected');
            unitRouteHandler = this.apartmentRouteFn(path, json.tag);
          }else{
            // console.log('tag is not a folio tag');
            unitRouteHandler = false;
          }

          const penthouseTag = ['p1', 'p2'];
          const isPenthouseTag = penthouseTag.includes(json.tag);

          if(isPenthouseTag){
            console.log('tag is a penthouse tag');
            if(json.tag === 'p1'){
              updateCurrentUnit(this.state.penthouseA);
              path = '/unit-details/' + this.state.penthouseA;
            }
            if(json.tag === 'p2'){
              updateCurrentUnit(this.state.penthouseB);
              path = '/unit-details/' + this.state.penthouseB;
            }
          }else{
            // console.log('no penthouse');
          }

          if(unitRouteHandler){
            this.context.router.push(unitRouteHandler);
          }else{
            this.context.router.push(path);
          }
        }else{
          console.log('tag is FALSE');

          //check if there are other tags still on the reader
          const isTagActive = Object.keys(this.props.tags).filter(function(key){
            return this.props.tags[key] == true;
          }, this);

          //if there are any tags still on the reader
          //go to that path
          if(isTagActive.length > 0){
            var lastTag = isTagActive[isTagActive.length - 1];
            updateCurrentTag(lastTag);

            console.log('a tag is still active: ' + lastTag);

            switch(lastTag){
              case 'ap1':
                //if there is a unit assigned
                if(this.props.folio.ap1 != ''){
                  console.log('unit still assigned to ap1');
                  path = '/unit-details/' + this.props.folio.ap1;
                }else{
                  console.log('ap1 does not have a unit assigned, going to keypad');
                  path = '/ap1';
                }
                break;
              case 'ap2':
                //if there is a unit assigned
                if(this.props.folio.ap1 != ''){
                  console.log('unit still assigned to ap2');
                  path = '/unit-details/' + this.props.folio.ap2;
                }else{
                  console.log('ap2 does not have a unit assigned, going to keypad');
                  path = '/ap2';
                }
                break;
              case 'p1':
                console.log('p1 is still down');
                updateCurrentUnit(this.state.penthouseA);
                path = '/unit-details/' + this.state.penthouseA;
                break;
              case 'p2':
                console.log('p2 is still down');
                updateCurrentUnit(this.state.penthouseB);
                path = '/unit-details/' + this.state.penthouseB;
                break;
              default:
                //go to route /t or /p1... whatever the tag is
                path = '/' + lastTag;
                break;
            }

            this.context.router.push(path);
          }else{
            //if there is no tag on table, go to home path
            console.log('no tags active, going to home');
            path = '/';
            updateCurrentTag('');
            updateCurrentUnit('');
            this.context.router.push(path);
          }
        }
      }catch(err){
        console.log('errrrrr');
      }

    }
  }

  apartmentRouteFn(defaultRoute, tag){

    const ap1Unit = this.props.folio['ap1'];
    // console.log('ap1 unit: ' + ap1Unit);
    const ap2Unit = this.props.folio['ap2'];
    // console.log('ap2 unit: ' + ap2Unit);

    //if ap1 and ap2 tags are both down at same time
    //if(this.props.tags['ap1'] == 'true' && this.props.tags['ap2'] == 'true'){  //use line above for actual RFID
    if(this.props.tags['ap1'] == true && this.props.tags['ap2'] == true){  //use this line for test RFID
      console.log('both ap1 and ap2 are active');
      console.log(ap1Unit);
      console.log(ap2Unit);
      if(ap1Unit != '' && ap2Unit != ''){
        return `/compare-units/${ap1Unit}+${ap2Unit}`
      }else if(ap1Unit && tag === 'ap1'){
        console.log('update?');
        updateCurrentUnit(ap1Unit);
        return `/unit-details/${ap1Unit}`
      }else if (ap2Unit && tag === 'ap2'){
        updateCurrentUnit(ap2Unit);
        return `/unit-details/${ap2Unit}`
      }
    }else{
      // console.log('ap1 and ap2 are NOT down');
    }

    //if one tag (ap1 or ap2) is down
    //and there is already a unit assigned to it
    //go directly to that unit URL and update the currentUnit in state
    if(tag === 'ap1' && ap1Unit != ''){
      updateCurrentUnit(ap1Unit);
      return `/unit-details/${ap1Unit}`
    }else if(tag === 'ap2' && ap2Unit != ''){
      updateCurrentUnit(ap2Unit);
      return `/unit-details/${ap2Unit}`
    }else {
      updateCurrentUnit('');
      return defaultRoute
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
