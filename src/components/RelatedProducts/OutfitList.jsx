/* eslint-disable no-sequences */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { TiDelete } from 'react-icons/ti';
import { IoAddCircleOutline } from 'react-icons/io5';
import StarsRating from '../ReviewStars/StarsRating.jsx';

function AddOutfitButton({ onClick }) {
  const handleMouseEnter = (e) => {
    const icon = e.currentTarget.querySelector('.add-icon');
    icon.style.color = 'white';
    icon.style.stroke = 'white';
  };

  const handleMouseLeave = (e) => {
    const icon = e.currentTarget.querySelector('.add-icon');
    icon.style.color = 'white';
    icon.style.stroke = 'black';
  };

  return (
    <div
      className="outfit-card"
      onClick={onClick}
      data-testid="add-outfit-button"
    >
      <div className="add-button">
        <div
          className="add-icon-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
        >
          <IoAddCircleOutline
            className="add-icon"
            style={{
              color: 'white',
              stroke: 'black',
              strokeWidth: '0.5',
            }}
          />
        </div>
        <div className="text-container">
          <span>Add to Outfit</span>
        </div>
      </div>
    </div>
  );
}

function OutfitList({
  outfits,
  onClickAddOutfits,
  removeItem,
  onClickRelatedProduct,
}) {
  const responsive2 = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1200 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1200, min: 700 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="outfit-button-carousel">
      <AddOutfitButton onClick={() => onClickAddOutfits()} />
      {outfits && (
        <Carousel
          className="outfit-carousel-item"
          responsive={responsive2}
          swipeable={false}
          draggable={false}
        >
          {outfits !== null &&
            Object.values(outfits).map((outfitsList) => (
              <div
                className="outfit-card"
                key={outfitsList.id}
                data-key={outfitsList.id}
                onClick={onClickRelatedProduct}
              >
                {outfitsList.photos && outfitsList.photos.length > 0 ? (
                  <img
                    className="outfit-image"
                    src={outfitsList.photos[0].url}
                    alt=""
                  />
                ) : (
                  <div className="outfit-alt-text">No photo available</div>
                )}
                <div
                  className="remove-button"
                  data-testid="remove-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(outfitsList.id);
                  }}
                >
                  <TiDelete
                    className="remove-icon"
                    style={{
                      color: 'white',
                      stroke: 'black',
                      strokeWidth: '0.5',
                    }}
                    onMouseOver={({ target }) => (
                      (target.style.color = 'black'),
                      (target.style.stroke = 'white')
                    )}
                    onMouseOut={({ target }) => (
                      (target.style.color = 'white'),
                      (target.style.stroke = 'black')
                    )}
                  />
                </div>
                <h3>{outfitsList.category}</h3>
                <h2>{outfitsList.name}</h2>
                <h4>
                  {outfitsList.sale_price ? (
                    <>
                      <span
                        style={{
                          textDecoration: 'line-through',
                          marginRight: '5px',
                        }}
                      >
                        ${outfitsList.default_price}
                      </span>
                      <span style={{ color: 'red' }}>
                        ${outfitsList.sale_price}
                      </span>
                    </>
                  ) : (
                    `$${outfitsList.default_price}`
                  )}
                </h4>
                <div className="OutfitRatingsContainer">
                  <StarsRating
                    className="OutfitRatings"
                    stars={outfitsList.avg_ratings}
                  />
                </div>
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
}

export default OutfitList;
