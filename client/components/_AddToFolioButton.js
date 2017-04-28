// import React from 'react';
// import { withRouter } from 'react-router';
// import Redux, { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as tagActions from '../actions/actionCreators';
//
// class AddToFolioButton extends React.Component{
//   constructor(){
//     super()
//   }
//
//   onClick(event){
//     console.log('add to folio: ', this.props);
//     const units = ['ap1', 'ap2']
//     // const getUnitAprtmnt = localStorage.getItem('currentUnit')
//     var getUnitApartment = '';
//
//     if(this.props.tags['ap1']){
//       getUnitApartment = 'ap1';
//       // console.log(getUnitApartment);
//       tagActions.assignToFolio(getUnitApartment, this.props.params.unitId);
//     }else if(this.props.tags['ap2']){
//       getUnitApartment = 'ap2';
//       tagActions.assignToFolio(getUnitApartment, this.props.params.unitId);
//       // console.log(getUnitApartment);
//     }
//     // const getUnitApartment =
//     //if aparmt matches ap1, set storage on api
//     // units.map((v, k) => v === getUnitAprtmnt ?
//     //  localStorage.setItem(v, this.props.params.unitId) : false)
//   }
//
//   render(){
//     return(
//       <div className={this.props.styleClass} onClick={(e) => this.onClick(e)}>
//         +
//       </div>
//     )
//   }
// }
//
// AddToFolioButton.propTypes = {
// }
//
// function mapStateToProps(state){
//   return {
//     tags: state.tags
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return {
//     tagActions: bindActionCreators(tagActions, dispatch)
//   }
// }
//
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddToFolioButton));
