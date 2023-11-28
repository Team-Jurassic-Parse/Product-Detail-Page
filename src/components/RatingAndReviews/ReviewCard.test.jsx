import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard.jsx'; // eslint-disable-line

describe('Test on FactorSlider component', () => {
  test('it should render 4 fullstars when rating is 4', () => {
    const mockReview = {
      body: 'test', rating: 4, recommend: true, date: Date.now(),
    };
    render(<ReviewCard review={mockReview} />);
    const fullStars = screen.getAllByLabelText('Full star');
    expect(fullStars.length).toBe(4);
  });
});
