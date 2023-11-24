import React from 'react';
import styled from 'styled-components';
import Star from './Star.jsx'; // eslint-disable-line

const Wrapper = styled.div`
  display: flex;
  gap: 2px;
`;

const StarBtn = styled.button`
  background: none; /* Remove background */
  color: inherit; /* Inherit font color from parent */
  border: none; /* Remove border */
  padding: 0; /* Remove padding */
  font: inherit; /* Inherit font settings */
  cursor: pointer; /* Set cursor to pointer */
  outline: none; /* Remove outline */
  line-height: normal; /* Normal line-height */
  overflow: visible; /* Prevent overflow clipping */
  -webkit-appearance: none; /* Remove iOS button styles */
  -moz-appearance: none; /* Remove Firefox button styles */
  appearance: none; /* Remove default browser styles */
`;

const starsNums = [1, 2, 3, 4, 5];

function ClickableStarsRating({ value, onClick }) { // eslint-disable-line
  return (
    <Wrapper role="scrollbar" aria-valuemin={1} aria-valuemax={5}>
      {starsNums.map((num) => (
        <StarBtn type="button" key={num} onClick={() => onClick(num)}>
          {value >= num ? <Star fill={1} /> : <Star fill={0} />}
        </StarBtn>
      ))}
    </Wrapper>
  );
}

export default ClickableStarsRating;
