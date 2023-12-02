import React, { useId } from 'react';
import styled from 'styled-components';
import descriptioinMap from './utils/descriptioinMap.js';

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px; /* Adjust as needed */

  input[type='range'] {
    -webkit-appearance: none; /* Override default appearance */
    width: 100%; /* Slider width */
    height: 10px; /* Slider height */
    border-radius: 5px;
    background: #ddd; /* Slider background */
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default appearance */
  appearance: none;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 16px 8px 0 8px; /* Adjust triangle size */
  border-color: #333 transparent transparent transparent; /* Triangle color */
  cursor: none;
  /* Center the thumb on the track */
  margin-top: -8px; /* This should be half of the border width */
  }

input[type='range']::-moz-range-thumb {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 16px 8px 0 8px; /* Adjust triangle size */
  border-color: #333 transparent transparent transparent; /* Triangle color */
  cursor: none;
  /* No need to adjust margin-top for Mozilla, it centers by default */
  }

  label {
    font-size: 14px;
    margin-top: 8px;
    font-weight: bold;
    color: #333;
  }
  `;
const FactorLabel = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
font-size: 12px; /* Adjust label font size as needed */
margin-top: 4px; /* Space between slider and label */
color: #aaa;
`;

function FactorSlider({ charact, value }) {
  const id = useId();
  return (
    <SliderWrapper>
      <input
        id={id}
        type="range"
        value={value}
        max={5}
        min={0}
        onChange={() => {}}
      />
      <FactorLabel>
        {descriptioinMap[charact.toLowerCase()].map((desc) => (
          <span key={desc}>{desc}</span>
        ))}
      </FactorLabel>
      <label htmlFor={id}>{charact}</label>
    </SliderWrapper>
  );
}

export default FactorSlider;
