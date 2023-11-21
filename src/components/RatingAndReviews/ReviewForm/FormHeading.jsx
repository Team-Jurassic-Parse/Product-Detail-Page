import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

function FormHeading({productName}) { // eslint-disable-line
  return (
    <Wrapper>
      <h3>Review Form for:</h3>
      <p>{ productName }</p>
    </Wrapper>
  );
}

export default FormHeading;
