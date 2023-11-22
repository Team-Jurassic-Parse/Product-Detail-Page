import React from 'react';
import styled from 'styled-components';

function UnstyledStyleItem({ item, setStyleId, isActive }) { // eslint-disable-line
  return (
    <div>
      i
    </div>
  );
}

const StyleItem = styled(UnstyledStyleItem)`
  display: inline-block;
`;

export default StyleItem;
