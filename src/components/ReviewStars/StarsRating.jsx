import React from 'react';
import styled from 'styled-components';
import Star from "./Star.jsx"; // eslint-disable-line

const Wrapper = styled.div`
  display: flex;
  gap : 2px;
`;

function StarsRating({ stars }) { // eslint-disable-line
  let n = stars;
  if (n < 0 || n > 5) {
    throw new Error('Input must be between 0 and 5');
  }

  const starsArray = [];
  for (let i = 0; i < 5; i += 1) {
    if (n >= 1) {
      starsArray.push(<Star key={i} fill={1} />);
      n -= 1;
    } else if (n > 0 && n < 1) {
      starsArray.push(<Star key={i} fill={n} />);
      n = 0;
    } else {
      starsArray.push(<Star key={i} fill={0} />);
    }
  }
  return (<Wrapper>{starsArray}</Wrapper>);
}

export default StarsRating;
