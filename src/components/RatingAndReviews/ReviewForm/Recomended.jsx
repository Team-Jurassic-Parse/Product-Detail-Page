import React, { useId } from 'react';
import styled from 'styled-components';

const Wrapper = styled.fieldset``;
function Recomended({recomended, setRecomended}) { // eslint-disable-line
  const id = useId();
  return (
    <Wrapper>
      <legend>Do you recommend this product?</legend>
    </Wrapper>
  );
}

export default Recomended;
