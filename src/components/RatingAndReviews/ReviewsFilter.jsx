import React from 'react';
import styled from 'styled-components';
import RatingBar from './RatingBar.jsx';
import useStarsFilter from './hooks/useStarsFilter.js';

const Wrapper = styled.div`
  margin-bottom: 48px;

  p {
    font-weight: bold;
  }
`;

const StarsFilter = styled.ol`
  padding: 0;
`;

const StarFilterLineWrapper = styled.li`
  display: flex;
  opacity: ${(props) => (props.isActive ? 1 : 0.2)};
  align-items: center;
  gap: 4px;

  span {
  white-space: nowrap;
  font-size: 0.9rem;
  }
`;

const getMaxRating = (ratings) => {
  let max = 0;
  for (const value of Object.values(ratings)) {
    if (Number(value) > max) {
      max = Number(value);
    }
  }
  return max;
}; // FIXME: move to a util folder.

function StarFilterLine({ children, rating }) {
  const { starsFilter, toggleStarsFilter } = useStarsFilter();

  return (
    <StarFilterLineWrapper
      isActive={starsFilter[rating]}
      onClick={() => toggleStarsFilter(rating)}
    >
      <span>
        {rating}
        {' '}
        Stars
      </span>
      {children}
    </StarFilterLineWrapper>
  );
}

function ReviewsFilter({ recommended, ratings }) {
  const recommendRate =    Number(recommended.true) /
    (Number(recommended.true) + Number(recommended.false));
  const maxRating = getMaxRating(ratings);

  return (
    <Wrapper>
      <p>
        {Math.round(recommendRate * 100)}
        % of reviewers recommend this product.
      </p>
      <StarsFilter>
        <StarFilterLine rating="5">
          <RatingBar rating={Number(ratings[5]) / maxRating} />
        </StarFilterLine>
        <StarFilterLine rating="4">
          <RatingBar rating={Number(ratings[4]) / maxRating} />
        </StarFilterLine>
        <StarFilterLine rating="3">
          <RatingBar rating={Number(ratings[3]) / maxRating} />
        </StarFilterLine>
        <StarFilterLine rating="2">
          <RatingBar rating={Number(ratings[2]) / maxRating} />
        </StarFilterLine>
        <StarFilterLine rating="1">
          <RatingBar rating={Number(ratings[1]) / maxRating} />
        </StarFilterLine>
      </StarsFilter>
    </Wrapper>
  );
}

export default ReviewsFilter;
