import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import StarsRating from './StarsRating.jsx';

describe('StarsRating Component test', () => {
  test('Renders 5 stars correctly with full rating', () => {
    render(<StarsRating stars={5} />);

    const fullStars = screen.getAllByLabelText('Full star');
    expect(fullStars.length).toBe(5);
  });

  test('Renders mix of stars based on stars prop input', () => {
    render(<StarsRating stars={2.5} />);
    const fullStars = screen.getAllByLabelText('Full star');
    const halfStars = screen.getAllByLabelText('Half star');
    const emptyStars = screen.getAllByLabelText('Empty star');

    expect(fullStars.length).toBe(2);
    expect(halfStars.length).toBe(1);
    expect(emptyStars.length).toBe(2);
  });

  test('Renders empty stars correctly for zero rating', () => {
    render(<StarsRating stars={0} />);
    const emptyStars = screen.getAllByLabelText('Empty star');
    expect(emptyStars.length).toBe(5);
  });

  test('Throw an error when stars prop is invalid', () => {
    const invalidRender = () => render(<StarsRating stars={6} />);
    expect(invalidRender).toThrow();
  });
});
