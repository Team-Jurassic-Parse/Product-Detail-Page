import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import RatingAndReviews from './index.jsx'; // eslint-disable-line

describe('Test on RatingAndReviews Widget', () => {
  test('RatingAndReviews should be rendered in pending state', () => {
    render(<RatingAndReviews productId={40344} productReview={{}} status="PENDING" error={null} />);
    const pendingText = screen.getByText(/pending\.\.\./i);
    expect(pendingText).toBeInTheDocument();
  });

  test('Show success state', () => {
    const mockMetaData = {
      product_id: '40344',
      ratings: {
        1: '155',
        2: '219',
        3: '340',
        4: '363',
        5: '756',
      },
      recommended: {
        false: '463',
        true: '1370',
      },
      characteristics: {
        Fit: {
          id: 135219,
          value: '3.2389937106918239',
        },
        Length: {
          id: 135220,
          value: '3.2775735294117647',
        },
        Comfort: {
          id: 135221,
          value: '3.3763132760267431',
        },
        Quality: {
          id: 135222,
          value: '3.3389830508474576',
        },
      },
    };
    render(<RatingAndReviews productId={40344} productReview={mockMetaData} status="SUCCESS" error={null} />);
    const heading = screen.getByRole('heading', { name: /ratings and reviews/i });
    expect(heading).toBeInTheDocument();
  });
});
