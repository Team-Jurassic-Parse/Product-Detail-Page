import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Factors from './Factors.jsx';

describe('Test on Factors component', () => {
  test('it should render', () => {
    const mockChar = { Fit: { id: 1, value: '3.3' } };
    render(<Factors characteristics={mockChar} />);
    const testSlider = screen.getByRole('slider', { name: /fit/i });
    expect(testSlider).toBeInTheDocument();
  });
});
