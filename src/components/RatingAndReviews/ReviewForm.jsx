import React, { useState } from 'react';
import styled from 'styled-components';
import ClickableStarsRating from '../ReviewStars/ClickableStarsRating.jsx'; // eslint-disable-line

const Wrapper = styled.form`
  background: white;
  padding: 24px 36px;
`;

function ReviewForm({ productName }) { // eslint-disable-line
  const [rating, setRating] = useState(5);

  return (
    <Wrapper>
      <h3>Review Form for:</h3>
      <p>{productName}</p>
      <ClickableStarsRating value={rating} onClick={(val) => { setRating(val); }} />
    </Wrapper>
  );
}

export default ReviewForm;
