import React, { useMemo } from 'react';
import styled from 'styled-components';
import ReviewScore from './ReviewScore.jsx'; // eslint-disable-line
import ReviewsFilter from './ReviewsFilter.jsx'; // eslint-disable-line
import Factors from './Factors.jsx'; // eslint-disable-line

import { calculateAverageRating } from '../ReviewStars/ProductStarRating.jsx'; // eslint-disable-line

const ContentWrapper = styled.div``;

function RatingSummaryContent({ productReview }) { // eslint-disable-line
  const avgScore = useMemo(() => calculateAverageRating(productReview.ratings), [productReview]); // eslint-disable-line

  return (
    <ContentWrapper>
      <ReviewScore score={avgScore} />
      <ReviewsFilter ratings={productReview.ratings} recommended={productReview.recommended}/> {/* eslint-disable-line */}
      <Factors characteristics={productReview.characteristics}/> {/* eslint-disable-line */}
    </ContentWrapper>
  );
}

export default RatingSummaryContent;
