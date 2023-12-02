import React from 'react';
import styled from 'styled-components';
import StarsRating from '../ReviewStars/StarsRating.jsx';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Score = styled.span`
  font-size: 3.2rem;
  font-weight: 700;
`;

function ReviewScore({ score }) {
  return (
    <Wrapper>
      <Score>{Math.round(score * 10) / 10}</Score>
      <StarsRating stars={score} />
    </Wrapper>
  );
}

export default ReviewScore;
