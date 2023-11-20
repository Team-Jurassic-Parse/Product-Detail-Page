import React, { useId } from 'react';
import styled from 'styled-components';

const SliderWrapper = styled.div``;

function FactorSlider({ charact, value }) { // eslint-disable-line
  const id = useId();
  return (
    <SliderWrapper>
      <input id={id} type="range" value={value} max={5} min={0} onChange={() => {}} />
      <label htmlFor={id}>{charact}</label>
    </SliderWrapper>
  );
}

export default FactorSlider;
