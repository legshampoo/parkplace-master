import React from 'react';
import { withRouter } from 'react-router';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tagActions from '../actions/actionCreators';

class AddToFolio extends React.Component{
  constructor(props){
    super(props)
    this.renderIcon = this.renderIcon.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('got props');
    // if(this.props.selectedMedia.saved !== nextProps.selectedMedia.saved)
    // {
    //        this.renderIcon();
    // }
  }

  renderIcon(){
    if(this.props.saved){
      return '-';
    }else{
      return '+';
    }
  }
  render(){
    return(
      <div
        className='add-to-folio-button'
        onClick={(e) => this.props.add(this.props.selectedMedia)}>
        {this.renderIcon()}
      </div>
    )
  }
}

AddToFolio.propTypes = {
}

function mapStateToProps(state){
  return {
    tags: state.tags
  }
}

function mapDispatchToProps(dispatch){
  return {
    tagActions: bindActionCreators(tagActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddToFolio));
