import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import FactorSlider from './FactorSlider.jsx';

describe('Test on FactorSlider component', () => {
  test('it should render', () => {
    render(<FactorSlider charact="size" value={4} />);
    const testSlider = screen.getByRole('slider', { name: /size/i });
    expect(testSlider).toBeInTheDocument();
  });
});
