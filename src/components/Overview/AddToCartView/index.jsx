import React from 'react';
import styled from 'styled-components';

function UnstyledAddToCartView({ currentStyle }) { // eslint-disable-line
  return (
    <>
      <h3>Add to Cart</h3>
      <p>{currentStyle && JSON.stringify(currentStyle.skus)}</p>{/*eslint-disable-line*/}
    </>
  );
}

const AddToCartView = styled(UnstyledAddToCartView)`
`;

export default AddToCartView;
