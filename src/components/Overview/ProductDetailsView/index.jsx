import React from 'react';
import styled from 'styled-components';

function UnstyledProductDetailsView({ productInfo, currentStyle }) { // eslint-disable-line
  return (
    <>
      <h3>Product Details</h3>
      <p>{JSON.stringify(productInfo)}</p>
    </>
  );
}

const ProductDetailsView = styled(UnstyledProductDetailsView)`

`;

export default ProductDetailsView;
