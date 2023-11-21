/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import React from 'react';
import Carousel from 'react-multi-carousel'; //eslint-disable-line
import 'react-multi-carousel/lib/styles.css'; //eslint-disable-line
import RelatedProducts from './index.jsx'; //eslint-disable-line
import ProductStarRating from '../ReviewStars/ProductStarRating.jsx'; //eslint-disable-line
import { BsStarFill } from 'react-icons/bs'; //eslint-disable-line

function RelatedProductsList({
  relatedItems,
  onClickRelatedProduct,
  setProductId,
}) {
  //eslint-disable-line
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (!relatedItems || !relatedItems.relatedItems) {
    //eslint-disable-line
    // Handle the case when relatedItems or relatedItems.relatedItems is null or undefined
    return <p>No related items available</p>;
  }
  const relatedItemsArray = Object.values(relatedItems.relatedItems); //eslint-disable-line

  return (
    <Carousel responsive={responsive} swipeable={false} draggable={false}>
      {relatedItemsArray.map((relatedList) => (
        <div
          className="card"
          key={relatedList.id}
          data-key={relatedList.id}
          onClick={onClickRelatedProduct}
        >
          {relatedList.photos && relatedList.photos.length > 0 ? (
            <img
              className="product-image"
              src={relatedList.photos[0].thumbnail_url}
              alt=""
            />
          ) : (
            <div className="alt-text">No photo available</div>
          )}
          <div
            className="favorite-button"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BsStarFill
              className="star-icon"
              style={{
                color: 'white',
                stroke: 'black',
                strokeWidth: '0.5',
              }}
              // eslint-disable-next-line no-return-assign
              onMouseOver={({ target }) => (
                // eslint-disable-next-line no-sequences
                (target.style.color = 'gold'), (target.style.stroke = 'white')
              )}
              // eslint-disable-next-line no-return-assign
              onMouseOut={({ target }) => (
                // eslint-disable-next-line no-sequences
                (target.style.color = 'white'), (target.style.stroke = 'black')
              )}
            />
          </div>
          <h3>{relatedList.category}</h3>
          <h2>{relatedList.name}</h2>
          <h4>
            {relatedList.sale_price ? (
              <>
                <span
                  style={{ textDecoration: 'line-through', marginRight: '5px' }}
                >
                  ${relatedList.default_price}
                </span>
                <span style={{ color: 'red' }}>${relatedList.sale_price}</span>
              </>
            ) : (
              `$${relatedList.default_price}`
            )}
          </h4>
          <div className="RelatedProductsRatingsContainer">
            <ProductStarRating
              productId={relatedList.id}
              className="RelatedProductsRatings"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default RelatedProductsList;
