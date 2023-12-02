import React from 'react';
import styled from 'styled-components';

const decimalToPercentageString = (decimal) => Math.round(decimal * 100)
  .toString()
  .concat('%');

const BarWrapper = styled.div`
  width: 100%;
  height: 12px;
  background: #ddd;
  margin: 8px 6px;
  border-radius: 4px;
`;
const BarContent = styled.div`
  height: 100%;
  width: ${(props) => decimalToPercentageString(props.rating)};
  border-radius: 4px;
  background: gold;
`;

function RatingBar({ rating }) {
  return (
    <BarWrapper>
      <BarContent rating={rating} />
    </BarWrapper>
  );
}

export default RatingBar;
