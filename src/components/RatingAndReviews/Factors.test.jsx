import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Factors from './Factors.jsx'; // eslint-disable-line

describe('Test on Factors component', () => {
  test('it should render', () => {
    render(<Factors characteristics={{ test: 5 }} />);
    const testSlider = screen.getByRole('slider', { name: /test/i });
    expect(testSlider).toBeInTheDocument();
  });
});
