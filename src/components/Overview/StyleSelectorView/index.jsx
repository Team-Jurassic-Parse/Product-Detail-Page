import React from 'react';
import styled from 'styled-components';

function UnstyledStyleSelectorView({ productStyles, styleId, setStyleId }) { // eslint-disable-line
  return (
    <>
      <h3>Style Selector</h3>
      <p>{styleId}</p>
    </>
  );
}

const StyleSelectorView = styled(UnstyledStyleSelectorView)`

`;

export default StyleSelectorView;
