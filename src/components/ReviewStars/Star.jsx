import React from 'react';

function Star({fill}) { // eslint-disable-line
  if (fill > 0.9) {
    return (<div aria-label="Full star">🌕</div>);
  }
  if (fill > 0.6) {
    return (<div aria-label="Three quarters star">🌖</div>);
  }
  if (fill > 0.4) {
    return (<div aria-label="Half star">🌗</div>);
  }
  if (fill > 0.1) {
    return (<div aria-label="Quarter star">🌘</div>);
  }
  return (<div aria-label="Empty star">🌑</div>);
}

export default Star;
