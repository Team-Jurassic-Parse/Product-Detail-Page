import React from 'react';
import StarsRating from '../ReviewStars/StarsRating.jsx'; // eslint-disable-line
import ProductStarRating from '../ReviewStars/ProductStarRating.jsx'; // eslint-disable-line

function RatingAndReviews() {
  return (
    <>
      <p>RatingAndReviews</p>
      <StarsRating stars={3.7} />
      <StarsRating stars={4.7} />
      <StarsRating stars={1.7} />
      <p>Review For ID 40344:</p>
      <ProductStarRating productId={40344} />
      <p>Review For ID 40347:</p>
      <ProductStarRating productId={40347} />

    </>
  );
}

export default RatingAndReviews;
