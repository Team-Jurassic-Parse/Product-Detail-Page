import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.form`
  background: white;
  padding: 24px 36px;
`;

function ReviewForm({ productName }) { // eslint-disable-line
  return (
    <Wrapper>
      <h3>Review Form for:</h3>
      <p>{productName}</p>
    </Wrapper>
  );
}

export default ReviewForm;
