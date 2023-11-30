import React from 'react';
import styled from 'styled-components';
import FactorSlider from './FactorSlider.jsx'; // eslint-disable-line

const Wrapper = styled.div`
`;

function Factors({ characteristics }) { // eslint-disable-line
  return (
    <Wrapper>
      {Object.entries(characteristics).map(([char, val]) => (
        <FactorSlider key={val.id} charact={char} value={val.value} />
      ))}
    </Wrapper>
  );
}

export default Factors;
