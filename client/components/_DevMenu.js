// import React from 'react'
// import Redux, {bindActionCreators} from 'redux'
// import {connect} from 'react-redux';
// import * as ap1Actions from '../actions/actionCreators';
// import * as tagActions from '../actions/actionCreators';
//
// import store from '../store';
//
// import Button from './Button'
// import { toggleAp1 } from '../actions/actionCreators';
// import { addOneToCounter } from '../actions/actionCreators';
// import { updateTagStatus } from '../actions/actionCreators';
//
// class DevMenu extends React.Component {
//   constructor(props){
//     super(props);
//
//     this.buttonClicked = this.buttonClicked.bind(this);
//
//     this.state = {
//       activeButton: {},
//       status: {
//         home: false,
//         ap1: false,
//         ap2: false,
//         am: false,
//         n: false,
//         p1: false,
//         p2: false,
//         t: false
//       }
//     }
//   }
//
//   componentDidMount(){
//     // console.log(store.getState());
//     const webSocketPort = 5560;
//     this.socket = new WebSocket('ws://localhost:' + webSocketPort);
//     this.socket.onopen = function(event){
//       console.log('User Interface WebSocket connected to: ' + event.currentTarget.URL);
//     }
//
//     //-----------------------
//     //Incoming Message From RFID
//     //-----------------------
//     this.socket.onmessage = event => {
//       var json = JSON.parse(event.data);
//       console.log(json);
//       //rename the incoming tags
//       // .toString() needed for actual RFID tags,
//       //but not used for dev menu
//       switch(json.tag.toString()){
//         case '1000': json.tag = 'ap1'; break;
//         case '2000': json.tag = 'ap2'; break;
//         case '3000': json.tag = 'am'; break;
//         case '4000': json.tag = 'n'; break;
//         case '5000': json.tag = 'p1'; break;
//         case '6000': json.tag = 'p2'; break;
//         case '7000': json.tag = 't'; break;
//       }
//
//       var status = this.state.status;
//       status[json.tag] = json.status;
//       this.setState({status: status});
//
//       // console.log(json.tag);
//       updateTagStatus(json.tag, json.status);
//
//       //this might need a .toString() == 'true' depending
//       //if the tag status is true (it's placed on the table)
//       if(json.status == true){
//         switch(json.tag){
//           case 'ap1': this.ap1_button.click(this.ap1_button); break;
//           case 'ap2': this.ap2_button.click(this.ap2_button); break;
//           case 'am': this.am_button.click(this.am_button); break;
//           case 'n': this.n_button.click(this.n_button); break;
//           case 'p1': this.p1_button.click(this.p1_button); break;
//           case 'p2': this.p2_button.click(this.p2_button); break;
//           case 't': this.t_button.click(this.t_button); break;
//         }
//       }
//
//       //if the tag leaves the table
//       if(json.status == false){
//
//         //check if there are other tags still on the table
//         const isTagActive = Object.keys(this.state.status).filter(function(key){
//           return this.state.status[key] == true;
//         }, this);
//
//         if(isTagActive == ''){
//           //if there are no tags on the table, go back to home
//           this.home_button.click(this.home_button);
//         }else{
//           //if there is still a tag on the table, go to that
//           switch(isTagActive.toString()){
//             case 'ap1': this.ap1_button.click(this.ap1_button); break;
//             case 'ap2': this.ap2_button.click(this.ap2_button); break;
//             case 'am': this.am_button.click(this.am_button); break;
//             case 'n': this.n_button.click(this.n_button); break;
//             case 'p1': this.p1_button.click(this.p1_button); break;
//             case 'p2': this.p2_button.click(this.p2_button); break;
//             case 't': this.t_button.click(this.t_button); break;
//           }
//         }
//       }
//     }
//
//     this.socket.onerror = function(error){
//       console.log('WebSocket Error: ' + error);
//     }
//     this.socket.onclose = function(event){
//       console.log('WebSocket closed');
//       //try to reconnect
//       // setTimeout(function(){start()})
//     }
//   }
//
//   buttonClicked(btn){
//     console.log('devmenu button clicked');
//     // const name = btn.props.name;
//     // const newStatus = !store.getState().tags[name];
//     // updateTagStatus(name, newStatus);
//   }
//
//   render() {
//     return (
//       <div className='devMenu'>
//         <Button ref={(button) => this.home_button = button } tags={this.props.tags} tagStatus={this.state.status} activeButton={this.state.activeButton} name='home' path='/' buttonClicked={this.buttonClicked}/>
//         <Button ref={(button) => this.ap1_button = button } tags={this.props.tags} tagStatus={this.state.status} activeButton={this.state.activeButton} name='ap1' path='/ap1' buttonClicked={this.buttonClicked}/>
//         <Button ref={(button) => this.ap2_button = button } tags={this.props.tags} tagStatus={this.state.status} activeButton={this.state.activeButton} name='ap2' path='/ap2' buttonClicked={this.buttonClicked}/>
//         <Button ref={(button) => this.am_button = button } tags={this.props.tags} tagStatus={this.state.status} activeButton={this.state.activeButton} name='am' path='/am' buttonClicked={this.buttonClicked}/>
//         <Button ref={(button) => this.n_button = button } tags={this.props.tags} tagStatus={this.state.status} activeButton={this.state.activeButton} name='n' path='/n' buttonClicked={this.buttonClicked}/>
//         <Button ref={(button) => this.p1_button = button } tags={this.props.tags} tagStatus={this.state.status} activeButton={this.state.activeButton} name='p1' path='/p1' buttonClicked={this.buttonClicked}/>
//         <Button ref={(button) => this.p2_button = button } tags={this.props.tags} tagStatus={this.state.status} activeButton={this.state.activeButton} name='p2' path='/p2' buttonClicked={this.buttonClicked}/>
//         <Button ref={(button) => this.t_button = button } tags={this.props.tags} tagStatus={this.state.status} activeButton={this.state.activeButton} name='t' path='/t' buttonClicked={this.buttonClicked}/>
//       </div>
//     )
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     ap1: state.ap1,
//     count: state.counter,
//     tags: state.tags
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     ap1Actions: bindActionCreators(ap1Actions, dispatch),
//     tagActions: bindActionCreators(tagActions, dispatch)
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(DevMenu);
