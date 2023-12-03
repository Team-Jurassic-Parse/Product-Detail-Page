import React from 'react';
import styled from 'styled-components';
import {
  TwitterShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterIcon,
  FacebookIcon,
  PinterestIcon,
} from 'react-share';
import { calculateAverageRating }  from '../../ReviewStars/ProductStarRating.jsx';
import StarsRating from '../../ReviewStars/StarsRating.jsx'

function UnstyledProductDetailsView({ productInfo, currentStyle, productReview, view }) {
  const onSale = React.useMemo(() => currentStyle ? !!currentStyle.sale_price : false, [currentStyle])

  const averageStars = React.useMemo(() => (
    productReview && productReview.ratings ? calculateAverageRating(productReview.ratings) : null
  ), [productReview]);

  const OriginalPrice = styled.a`
    ${onSale && (`
      color: red;
      text-decoration: line-through
    `)}
  `;

  const StyledStarsRating = styled(StarsRating)`
    font-size: 1px;
    margin: 0px;
  `;

  const ProductCategory = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
  `;

  const ProductName = styled.h1`
    margin-top: 10px;
    margin-bottom: 10px;
    text-transform: uppercase;
  `;

  const ProductDescription = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
    max-height: calc(30vh - 215px);
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  const shareButtonStyle = {
    margin: '2px',
    marginTop: '10px',
    display: 'inline-block',
  };

  return (
    <div style={{ marginLeft: view === 'expanded' ? '30px' : '0px' }}>
      {productInfo && (
        <>
          {averageStars ? <StyledStarsRating stars={averageStars}/> : <div>Loading...</div>}
          <div>
            <FacebookShareButton
              hashtag="TeamJurassicParse"
              url={window.location.href}
              style={shareButtonStyle}
              name="FacebookShare"
            >
              <FacebookIcon size={30} borderRadius={10} bgStyle={{ fill: 'black' }} />
            </FacebookShareButton>
            <TwitterShareButton
              url={window.location.href}
              style={shareButtonStyle}
              name="TwitterShare"
            >
              <TwitterIcon size={30} borderRadius={10} bgStyle={{ fill: 'black' }} />
            </TwitterShareButton>
            <PinterestShareButton
              url={window.location.href}
              media={currentStyle && currentStyle.photos[0] ? currentStyle.photos[0].url : null}
              style={shareButtonStyle}
              name="PinterestShare"
            >
              <PinterestIcon size={30} borderRadius={10} bgStyle={{ fill: 'black' }} />
            </PinterestShareButton>
          </div>
          <ProductCategory>{productInfo.category.toUpperCase()}</ProductCategory>
          <ProductName>{productInfo.name}</ProductName>
          { currentStyle && (
            <>
              <OriginalPrice>{`$${currentStyle.original_price}`}</OriginalPrice>
              {onSale && <a>{`$${currentStyle.sale_price}`}</a>}
            </>
          )}
          <ProductDescription>{productInfo.description}</ProductDescription>
        </>
      )}
    </div>
  );
}

const ProductDetailsView = styled(UnstyledProductDetailsView)`

`;

export default ProductDetailsView;
