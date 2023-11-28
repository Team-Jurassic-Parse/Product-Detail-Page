import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import FactorSlider from './FactorSlider.jsx'; // eslint-disable-line

describe('Test on FactorSlider component', () => {
  test('it should render', () => {
    render(<FactorSlider charact="test" value={5} />);
    const testSlider = screen.getByRole('slider', { name: /test/i });
    expect(testSlider).toBeInTheDocument();
  });
});
