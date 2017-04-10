import React from 'react';

import TextLink from './TextLink';

//pass the className as a prop, based on what is selected
const RenderAssets = ({data, handleClick}) =>
  <div className='render-assets'>

    {data.map((media, index) => (
      <TextLink handleClick={handleClick.bind(this, media)} key={index} path={media.pan} displayText={media.name} allowAddToFolio={false} />)
    )}
  </div>



export default RenderAssets
