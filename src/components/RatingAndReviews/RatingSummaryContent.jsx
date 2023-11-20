import React, { useMemo } from 'react';
import styled from 'styled-components';
import ReviewScore from './ReviewScore.jsx'; // eslint-disable-line
import ReviewsFilter from './ReviewsFilter.jsx'; // eslint-disable-line
import Factors from './Factors.jsx'; // eslint-disable-line

import { calculateAverageRating } from '../ReviewStars/ProductStarRating.jsx'; // eslint-disable-line

const ContentWrapper = styled.div`
  background: yellowgreen;
`;

function RatingSummaryContent({ productReview }) { // eslint-disable-line
  console.log(productReview);
  const avgScore = useMemo(() => calculateAverageRating(productReview.ratings), [productReview]); // eslint-disable-line

  return (
    <ContentWrapper>
      <ReviewScore score={avgScore} />
      <ReviewsFilter ratings={productReview.ratings} recommended={productReview.recommended}/> {/* eslint-disable-line */}
      <Factors />
    </ContentWrapper>
  );
}

export default RatingSummaryContent;
