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
import { calculateAverageRating }  from '../../ReviewStars/ProductStarRating.jsx'; // eslint-disable-line
import StarsRating from '../../ReviewStars/StarsRating.jsx' // eslint-disable-line

function UnstyledProductDetailsView({ productInfo, currentStyle, productReview }) { // eslint-disable-line
  const onSale = React.useMemo(() => currentStyle ? !!currentStyle.sale_price : false, [currentStyle]) // eslint-disable-line

  const averageStars = React.useMemo(() => (
    productReview && productReview.ratings ? calculateAverageRating(productReview.ratings) : null // eslint-disable-line
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

  const ProductName = styled.h2`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 30px;
  `;
  const ProductDescription = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
    max-height: 10.5vh;
    overflow-y: scroll;
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
    <div>
      {productInfo && (
        <>
          {averageStars ? <StyledStarsRating stars={averageStars}/> : <div>Loading...</div>} {/*eslint-disable-line*/}
          <div>
            <FacebookShareButton
              hashtag="TeamJurassicParse"
              url={window.location.href}
              style={shareButtonStyle}
            >
              <FacebookIcon size={30} borderRadius={10} bgStyle={{ fill: 'black' }} />
            </FacebookShareButton>
            <TwitterShareButton
              url={window.location.href}
              style={shareButtonStyle}
            >
              <TwitterIcon size={30} borderRadius={10} bgStyle={{ fill: 'black' }} />
            </TwitterShareButton>
            <PinterestShareButton
              url={window.location.href}
              media={currentStyle && currentStyle.photos[0] ? currentStyle.photos[0].url : null} // eslint-disable-line
              style={shareButtonStyle}
            >
              <PinterestIcon size={30} borderRadius={10} bgStyle={{ fill: 'black' }} />
            </PinterestShareButton>
          </div>
          <ProductCategory>{productInfo.category.toUpperCase()}</ProductCategory> {/*eslint-disable-line*/}
          <ProductName>{productInfo.name}</ProductName> {/*eslint-disable-line*/}
          { currentStyle && (
            <>
              <OriginalPrice>{`$${currentStyle.original_price}`}</OriginalPrice> {/*eslint-disable-line*/}
              {onSale && <a>{`$${currentStyle.sale_price}`}</a>} {/*eslint-disable-line*/}
            </>
          )}
          <ProductDescription>{productInfo.description}</ProductDescription> {/*eslint-disable-line*/}
        </>
      )}
    </div>
  );
}

const ProductDetailsView = styled(UnstyledProductDetailsView)`

`;

export default ProductDetailsView;
