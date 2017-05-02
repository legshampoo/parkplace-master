import React from 'react';
import { withRouter } from 'react-router';
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tagActions from '../actions/actionCreators';

class AddToFolio extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='add-to-folio-button'
        onClick={(e) => this.props.add(this.props.selectedMedia)}>
        +
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
