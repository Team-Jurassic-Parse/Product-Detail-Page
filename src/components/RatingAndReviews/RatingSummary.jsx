import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: green;
  flex: 1;
  min-height: 200px; // FIXME:
`;

function RatingSummary({ productId }) { // eslint-disable-line
  return (
    <Wrapper>Summary</Wrapper>
  );
}

export default RatingSummary;
