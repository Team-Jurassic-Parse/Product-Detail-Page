import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Overview from './index.jsx'; // eslint-disable-line

describe('Overview', () => {
  it('exists', () => {
    render(<Overview />);
    expect(screen.getAllByText('Overview').toBeTruthy);
  });
});
