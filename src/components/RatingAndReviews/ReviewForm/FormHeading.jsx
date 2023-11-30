import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  p {
    font-weight: bold;
    font-size: 1.3rem;
    color: #222;
  }
`;

function FormHeading({ productName }) { // eslint-disable-line
  return (
    <Wrapper>
      <h3>Review Form For:</h3>
      <p>{productName}</p>
    </Wrapper>
  );
}

export default FormHeading;
