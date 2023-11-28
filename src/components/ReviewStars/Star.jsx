import React from 'react';
import styled from 'styled-components';

const StarWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: ${(p) => p.size || '24px'};
  height: ${(p) => p.size || '24px'};
  background-color: transparent;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);

  &::before, &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: gray;
    /* clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); */
  }

  &[aria-label="Quarter star"]::after {
    width: 35%;
    overflow: hidden;
    background-color: ${(p) => p.color || 'gold'};
    z-index: 1;
  }

  &[aria-label="Half star"]::after {
    width: 50%;
    overflow: hidden;
    background-color: ${(p) => p.color || 'gold'};
    z-index: 1;
  }

  &[aria-label="Three quarters star"]::after {
    width: 65%;
    overflow: hidden;
    background-color: ${(p) => p.color || 'gold'};
    z-index: 1;
  }

  &[aria-label="Full star"]::after {
    width: 100%;
    overflow: hidden;
    background-color: ${(p) => p.color || 'gold'};
    z-index: 1;
  }

`;

function Star({ fill }) { // eslint-disable-line
  if (fill > 0.9) {
    return <StarWrapper aria-label="Full star" size="24px" />;
  }
  if (fill > 0.6) {
    return <StarWrapper aria-label="Three quarters star" size="24px" />;
  }
  if (fill > 0.4) {
    return <StarWrapper aria-label="Half star" size="24px" />;
  }
  if (fill > 0.1) {
    return <StarWrapper aria-label="Quarter star" size="24px" />;
  }
  return <StarWrapper aria-label="Empty star" size="24px" />;
}

export default Star;
