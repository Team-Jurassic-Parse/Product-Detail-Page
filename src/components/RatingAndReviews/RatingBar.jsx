import React from 'react';
import styled from 'styled-components';

const decimalToPercentageString = (decimal) => Math.round(decimal * 100)
  .toString()
  .concat('%');

const BarWrapper = styled.div`
  width: 50%;
  height: 12px;
  background: gray;
  margin: 6px;
  border-radius: 4px;
`;
const BarContent = styled.div`
  height: 100%;
  width: ${(props) => decimalToPercentageString(props.rating)};
  border-radius: 4px;
  background: gold;
`;

function RatingBar({ rating }) { // eslint-disable-line
  return (
    <BarWrapper>
      <BarContent rating={rating} />
    </BarWrapper>
  );
}

export default RatingBar;
