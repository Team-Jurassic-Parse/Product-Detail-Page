import React from 'react';
import Star from "./Star.jsx"; // eslint-disable-line

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
  return (<div style={{ display: 'flex', gap: 2 }}>{starsArray}</div>);
}

export default StarsRating;
