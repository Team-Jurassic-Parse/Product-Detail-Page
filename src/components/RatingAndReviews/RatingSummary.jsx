import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: green;
  flex: 1;
  height: 200px; // FIXME:
`;

function RatingSummary() {
  return (
    <Wrapper>Summary</Wrapper>
  );
}

export default RatingSummary;
