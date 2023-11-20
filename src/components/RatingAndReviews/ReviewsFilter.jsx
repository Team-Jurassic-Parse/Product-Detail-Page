import React from 'react';
import styled from 'styled-components';
import RatingBar from './RatingBar.jsx'; // eslint-disable-line

const Wrapper = styled.div`
  background: wheat;
`;

const StarsFilter = styled.ol``;

const StarFilterLine = styled.li`
  display: flex;
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
        <StarFilterLine>
          <span>5 Stars</span>
          <RatingBar rating={Number(ratings[5]) / maxRating} />
        </StarFilterLine>
        <StarFilterLine>
          <span>4 Stars</span>
          <RatingBar rating={Number(ratings[4]) / maxRating} />
        </StarFilterLine>
        <StarFilterLine>
          <span>3 Stars</span>
          <RatingBar rating={Number(ratings[3]) / maxRating} />
        </StarFilterLine>
        <StarFilterLine>
          <span>2 Stars</span>
          <RatingBar rating={Number(ratings[2]) / maxRating} />
        </StarFilterLine>
        <StarFilterLine>
          <span>1 Stars</span>
          <RatingBar rating={Number(ratings[1]) / maxRating} />
        </StarFilterLine>
      </StarsFilter>
    </Wrapper>
  );
}

export default ReviewsFilter;
