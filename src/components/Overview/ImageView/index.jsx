import React from 'react';
import styled from 'styled-components';

function UnstyledImageView({ currentStyle }) { // eslint-disable-line
  return (
    <>
      <h3>Image View</h3>
      <h4>{currentStyle && `Style: ${currentStyle.style_id}`}</h4>{/*eslint-disable-line*/}
      <p>
        {currentStyle && currentStyle.name}{/*eslint-disable-line*/}
      </p>
    </>
  );
}

const ImageView = styled(UnstyledImageView)`

`;

export default ImageView;
