import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RelatedProducts from './index.jsx';
import ProductStarRating from '../ReviewStars/ProductStarRating.jsx';
import { TiDelete } from 'react-icons/ti';
import { IoAddCircleOutline } from 'react-icons/io5';

function AddOutfitButton({ onClick }) {
  return (
    <div className="outfit-card" onClick={onClick}>
      <div className="add-button">
        <IoAddCircleOutline
          className="add-icon"
          style={{
            color: 'white',
            stroke: 'black',
            strokeWidth: '0.5',
          }}
          onMouseOver={({ target }) => (
            (target.style.color = 'black'), (target.style.stroke = 'white')
          )}
          onMouseOut={({ target }) => (
            (target.style.color = 'white'), (target.style.stroke = 'black')
          )}
        />
        <span>Add to Outfit</span>
      </div>
    </div>
  );
}

function OutfitList({ outfits, onClickAddOutfits, removeItem }) {
  const responsive2 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
              <div className="outfit-card" key={outfitsList.id}>
                {outfitsList.photos && outfitsList.photos.length > 0 ? (
                  <img
                    className="outfit-image"
                    src={outfitsList.photos[0].thumbnail_url}
                    alt=""
                  />
                ) : (
                  <div className="outfit-alt-text">No photo available</div>
                )}
                <div
                  className="remove-button"
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
                  <ProductStarRating
                    productId={outfitsList.id}
                    className="OutfitRatings"
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
