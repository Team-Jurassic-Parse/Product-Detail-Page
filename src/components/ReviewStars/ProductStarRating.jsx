import React from 'react';
import useReviewRating, {
  StatusEnum,
} from '../../hooks/ReviewStars/useReviewsRating.js';
import StarsRating from './StarsRating.jsx';

export function calculateAverageRating(ratings) {
  const totalScore =
    (1 * Number(ratings[1]) || 0) +
    (2 * Number(ratings[2]) || 0) +
    (3 * Number(ratings[3]) || 0) +
    (4 * Number(ratings[4]) || 0) +
    (5 * Number(ratings[5]) || 0);

  const totalCount =
    (Number(ratings[1]) || 0) +
    (Number(ratings[2]) || 0) +
    (Number(ratings[3]) || 0) +
    (Number(ratings[4]) || 0) +
    (Number(ratings[5]) || 0);

  return totalCount === 0 ? 0 : totalScore / totalCount;
}

function ProductStarRating({ productId }) {
  const { productReview, status, error } = useReviewRating(productId);
  if (status === StatusEnum.pending) {
    return <div>Pending...</div>;
  }
  if (status === StatusEnum.error) {
    return <div>{error}</div>;
  }
  if (status === StatusEnum.success) {
    return (
      <StarsRating stars={calculateAverageRating(productReview.ratings)} />
    );
  }
}

export default React.memo(ProductStarRating);
