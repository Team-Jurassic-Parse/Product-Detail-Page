import React from 'react';
import styled from 'styled-components';
import { StatusEnum } from '../../hooks/ReviewStars/useReviewsRating.js'; // eslint-disable-line
import RatingSummaryContent from './RatingSummaryContent.jsx'; // eslint-disable-line

const Wrapper = styled.div`
  flex: 1;
  min-height: 200px; // FIXME:
  padding: 24px 36px;
`;

function RatingSummary({ productId, productReview, status, error }) { // eslint-disable-line
  return (
    <Wrapper>
      {/* FIXME: fancier pending state. */}
      {status === StatusEnum.pending && <div>Pending...</div>}
      {status === StatusEnum.error && <div>{error}</div>}
      {status === StatusEnum.success && (
        <RatingSummaryContent productReview={productReview} />
      )}
    </Wrapper>
  );
}

export default React.memo(RatingSummary);
