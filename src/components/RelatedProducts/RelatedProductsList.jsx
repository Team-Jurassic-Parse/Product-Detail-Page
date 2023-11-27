/* eslint-disable no-sequences */
/* eslint-disable no-param-reassign */
/* eslint-disable import/order */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-return-assign */
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StarsRating from '../ReviewStars/StarsRating.jsx';
import { BsStarFill } from 'react-icons/bs';

function RelatedProductsList({
  relatedItems,
  onClickRelatedProduct,
  setCurrentIdAndUpdateModal,
}) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1200 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1200, min: 700 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  if (!relatedItems || !relatedItems.relatedItems) {
    return <p>No related items available</p>;
  }
  const relatedItemsArray = Object.values(relatedItems.relatedItems);

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
              src={relatedList.photos[0].url}
              alt=""
            />
          ) : (
            <div className="alt-text">No photo available</div>
          )}
          <div
            className="favorite-button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdAndUpdateModal(relatedList.id);
            }}
          >
            <BsStarFill
              className="star-icon"
              style={{
                color: 'white',
                stroke: 'black',
                strokeWidth: '0.5',
              }}
              onMouseOver={({ target }) => (
                (target.style.color = 'gold'), (target.style.stroke = 'white')
              )}
              onMouseOut={({ target }) => (
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
            <StarsRating
              className="RelatedProductsRatings"
              stars={relatedList.avg_ratings}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default RelatedProductsList;
