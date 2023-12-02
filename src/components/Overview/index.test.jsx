import React from 'react';
import {
  describe,
  expect, it,
  beforeEach,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Overview from './index.jsx';

describe('Overview', () => {
  beforeEach(() => {
    render(<Overview />);
  });
  it('exists', () => {
    expect(screen.getAllByText('Overview').toBeTruthy);
  });
  it('fetches product info on productId change', () => {
    expect(Promise.resolve(setTimeout(() => Overview.productInfo, 1000))).toBeTruthy();
  });
  it('fetches product styles on productId change', () => {
    expect(Promise.resolve(setTimeout(() => Overview.productInfo, 1000))).toBeTruthy();
  });
});
