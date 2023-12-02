import { describe, it, expect } from '@jest/globals';
import filterReviewsByStars from './filterReviewsByStars.js';

describe('filterReviewsByStars', () => {
  it('should filter reviews based on star ratings', () => {
    const reviews = [
      { id: 1, rating: 5 },
      { id: 2, rating: 4 },
      { id: 3, rating: 5 },
      { id: 4, rating: 3 },
    ];

    const starsFilter = {
      5: true,
      4: false,
      3: true,
    };

    const filteredReviews = filterReviewsByStars(reviews, starsFilter);

    // Expect filteredReviews to only contain reviews with ratings of 5 and 3
    expect(filteredReviews).toEqual([
      { id: 1, rating: 5 },
      { id: 3, rating: 5 },
      { id: 4, rating: 3 },
    ]);
  });
});
