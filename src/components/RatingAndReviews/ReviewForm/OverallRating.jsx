import React from 'react';
import styled from 'styled-components';
import ClickableStarsRating from '../../ReviewStars/ClickableStarsRating.jsx'; // eslint-disable-line

const ratingMap = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great',
};

const RatingText = styled.span`
  background-color: ${(prop) => {
    if (prop.rating > 3) {
      return '#d1fae5';
    }
    if (prop.rating > 2) {
      return '#fef3c7';
    }
    return '#fee2e2';
  }};
  color: ${(prop) => {
    if (prop.rating > 3) {
      return '#065f46';
    }
    if (prop.rating > 2) {
      return '#92400e';
    }
    return '#991b1b';
  }};
  font-size: 0.8rem;
  font-weight: 700;
  margin-right: 0.5rem;
  padding: 0.15rem 0.625rem;
  border-radius: 0.25rem;
`;

const Wrapper = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function OverallRating({rating, handleChangeRating}) { // eslint-disable-line
  return (
    <Wrapper>
      <legend>Overall Rating</legend>
      <RatingText rating={rating}>{ratingMap[rating]}</RatingText>
      <ClickableStarsRating value={rating} onClick={handleChangeRating} />
    </Wrapper>
  );
}

export default OverallRating;
