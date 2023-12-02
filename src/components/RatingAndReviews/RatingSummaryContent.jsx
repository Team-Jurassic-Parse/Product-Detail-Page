import React, { useMemo } from 'react';
import styled from 'styled-components';
import ReviewScore from './ReviewScore.jsx';
import ReviewsFilter from './ReviewsFilter.jsx';
import Factors from './Factors.jsx';

import { calculateAverageRating } from '../ReviewStars/ProductStarRating.jsx';

const ContentWrapper = styled.div``;

function RatingSummaryContent({ productReview }) {
  const avgScore = useMemo(() => calculateAverageRating(productReview.ratings), [productReview]);

  return (
    <ContentWrapper>
      <ReviewScore score={avgScore} />
      <ReviewsFilter ratings={productReview.ratings} recommended={productReview.recommended}/>
      <Factors characteristics={productReview.characteristics}/>
    </ContentWrapper>
  );
}

export default RatingSummaryContent;
