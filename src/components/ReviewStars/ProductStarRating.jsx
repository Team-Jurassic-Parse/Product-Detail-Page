import React from 'react';
import useReviewRating, { StatusEnum } from '../../hooks/ReviewStars/useReviewsRating.js'; // eslint-disable-line
import StarsRating from './StarsRating.jsx'; // eslint-disable-line

function ProductStarRating({ productId }) { // eslint-disable-line
  const { rating, status, error } = useReviewRating(productId);
  if (status === StatusEnum.pending) {
    return (<div>Pending...</div>);
  }
  if (status === StatusEnum.error) {
    return <div>{error}</div>;
  }
  if (status === StatusEnum.success) {
    return (<StarsRating stars={rating} />);
  }
}

export default ProductStarRating;
