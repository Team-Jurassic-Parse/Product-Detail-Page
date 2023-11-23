import React from 'react';
import styled from 'styled-components';
import ProductStarRating from '../../ReviewStars/ProductStarRating.jsx'; // eslint-disable-line
import SalePrice from './SalePrice.jsx';

function UnstyledProductDetailsView({ productInfo, currentStyle }) { // eslint-disable-line



  const ProductRating = styled(ProductStarRating)`
    font-size: 1px;
    margin: 0px;
  `;

  const ProductCategory = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
  `;

  const ProductName = styled.h2`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 30px;
  `;
  return (
    <>
      {productInfo && (
        <>
          <ProductRating productId={productInfo.id} /> {/*eslint-disable-line*/}
          <ProductCategory>{productInfo.category.toUpperCase()}</ProductCategory> {/*eslint-disable-line*/}
          <ProductName>{productInfo.name}</ProductName> {/*eslint-disable-line*/}
        </>
      )}
      { currentStyle && (
        <SalePrice currentStyle={currentStyle}/>
      )}
    </>
  );
}

const ProductDetailsView = styled(UnstyledProductDetailsView)`

`;

export default ProductDetailsView;
