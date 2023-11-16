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
      PId: 1
      <ProductStarRating productId={6} />
      <ProductStarRating productId={1} />

    </>
  );
}

export default RatingAndReviews;
