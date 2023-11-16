import React from 'react';

function Star({fill}) { // eslint-disable-line
  if (fill > 0.9) {
    return (<div>🌕</div>);
  }
  if (fill > 0.6) {
    return (<div>🌖</div>);
  }
  if (fill > 0.4) {
    return (<div>🌗</div>);
  }
  if (fill > 0.1) {
    return (<div>🌘</div>);
  }
  return (<div>🌑</div>);
}

export default Star;
