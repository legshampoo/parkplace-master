import React from 'react';

import AddToFolioButton from './AddToFolioButton';

class TextLink extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.AllowAddToFolio = this.AllowAddToFolio.bind(this);
  }

  AllowAddToFolio(props){
    if(props.allow){
      return <AddToFolioButton styleClass='add-to-folio-button' />
    }else{
      return null;
    }
  }

  handleSubmit(event){
    console.log('TextLink clicked... path: ' + this.props.path)
  }

  render(){
    return(
      <div className='text-link-wrapper'>
        <div className='add-to-folio-wrapper'>
          <this.AllowAddToFolio allow={this.props.allowAddToFolio} />
        </div>
        <div className='text-link-button' onClick={this.handleSubmit}>
          <h2 className='text-link-text'>{this.props.displayText}</h2>
        </div>
      </div>
    )
  }
}

TextLink.propTypes = {
  path: React.PropTypes.string.isRequired,
  displayText: React.PropTypes.string.isRequired,
  allowAddToFolio: React.PropTypes.bool.isRequired
}

export default TextLink
