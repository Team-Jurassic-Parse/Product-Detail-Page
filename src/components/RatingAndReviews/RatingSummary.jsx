import React from 'react';
import styled from 'styled-components';
import useReviewRating, { StatusEnum } from '../../hooks/ReviewStars/useReviewsRating.js'; // eslint-disable-line
import RatingSummaryContent from './RatingSummaryContent.jsx'; // eslint-disable-line

const Wrapper = styled.div`
  flex: 1;
  min-height: 200px; // FIXME:

  h3 {
    text-transform: uppercase;
  }
`;

function RatingSummary({ productId }) { // eslint-disable-line

  const { productReview, status, error } = useReviewRating(productId);

  return (
    <Wrapper>
      <h3>ratings and reviews</h3>
      {/* FIXME: fancier pending state. */}
      {status === StatusEnum.pending && <div>Pending...</div>}
      {status === StatusEnum.error && <div>{error}</div>}
      {status === StatusEnum.success && <RatingSummaryContent productReview={productReview} />}
    </Wrapper>
  );
}

export default React.memo(RatingSummary);
