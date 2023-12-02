import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import OverallRating from './OverallRating.jsx';

describe('OverallRating component test', () => {
  test('it shows the rating component', () => {
    render(<OverallRating rating={5} handleChangeRating={() => {}} />);
    const ratingDiv = screen.getByRole('group', { name: /overall rating/i });
    expect(ratingDiv).toBeInTheDocument();
  });

  test('it shows poor text when rating is 1', () => {
    render(<OverallRating rating={1} handleChangeRating={() => {}} />);
    const poorText = screen.getByText(/poor/i);
    expect(poorText).toBeInTheDocument();
  });

  test('it shows average text when rating is 3', () => {
    render(<OverallRating rating={3} handleChangeRating={() => {}} />);
    const poorText = screen.getByText(/average/i);
    expect(poorText).toBeInTheDocument();
  });
});
