import React from 'react';
import styled from 'styled-components';
import RatingBar from './RatingBar.jsx'; // eslint-disable-line
import useStarsFilter from './hooks/useStarsFilter.js';

const Wrapper = styled.div``;

const StarsFilter = styled.ol``;

const StarFilterLineWrapper = styled.li`
  display: flex;
  opacity: ${(props) => (props.isActive ? 1 : 0.2)};
`;

const getMaxRating = (ratings) => {
  let max = 0;
  for (const value of Object.values(ratings)) { // eslint-disable-line
    if (value > max) {
      max = value;
    }
  }
  return max;
}; // FIXME: move to a util folder.

function StarFilterLine({ children, rating }) {
  const { starsFilter, toggleStarsFilter } = useStarsFilter();

  return (
    <StarFilterLineWrapper isActive={starsFilter[rating]} onClick={() => toggleStarsFilter(rating)}>
      <span>
        {rating}
        {' '}
        Stars
      </span>
      {children}
    </StarFilterLineWrapper>
  );
}

function ReviewsFilter({recommended, ratings}) { // eslint-disable-line
  const recommendRate = Number(recommended.true) / (Number(recommended.true) + Number(recommended.false)); // eslint-disable-line
  const maxRating = getMaxRating(ratings);

  return (
    <Wrapper>
      <div>
        {Math.round(recommendRate * 100)}
        % of reviewers recommend this product.
      </div>
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
