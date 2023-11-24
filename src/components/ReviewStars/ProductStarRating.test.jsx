import { jest, describe, test, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductStarRating from './ProductStarRating';

jest.mock('../../hooks/ReviewStars/useReviewsRating.js', () => {
  const actual = jest.requireActual(
    '../../hooks/ReviewStars/useReviewsRating.js'
  );
  return {
    __esModule: true,
    default: jest.fn(),
    StatusEnum: actual.StatusEnum,
  };
});

import useReviewRating from '../../hooks/ReviewStars/useReviewsRating'; // eslint-disable-line

describe('ProductStarRating Tests', () => {
  test('Should render pending status correctly', () => {
    useReviewRating.mockReturnValue({
      productReview: null,
      status: 'PENDING',
      error: null,
    });

    render(<ProductStarRating productId="123" />);
    expect(screen.getByText(/pending.../i)).toBeInTheDocument();
  });

  test('Should render error status when hook gives back error', () => {
    useReviewRating.mockReturnValue({
      productReview: null,
      status: 'ERROR',
      error: 'Mock error from jest',
    });

    render(<ProductStarRating productId="123" />);
    expect(screen.getByText(/mock error from jest/i)).toBeInTheDocument();
  });

  test('Should render right number of stars when fech data succefully', () => {
    useReviewRating.mockReturnValue({
      productReview: {
        ratings: {
          1: '0',
          2: '0',
          3: '0',
          4: '50',
          5: '50',
        },
      },
      status: 'SUCCESS',
      error: null,
    });

    render(<ProductStarRating productId="123" />);
    const fullStars = screen.getAllByLabelText('Full star');
    const halfStars = screen.getAllByLabelText('Half star');

    expect(fullStars.length).toBe(4);
    expect(halfStars.length).toBe(1);
  });
});
