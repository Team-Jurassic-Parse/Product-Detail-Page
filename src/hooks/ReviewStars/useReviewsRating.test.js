import { renderHook } from '@testing-library/react';
import {
  test, expect, describe, jest, afterEach,
} from '@jest/globals';
import useReviewRating, { StatusEnum } from './useReviewsRating.js'; // eslint-disable-line
import useServerFetch from '../useServerFetch';

// Mock useServerFetch
jest.mock('../useServerFetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useReviewRating', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should start in an pending state', async () => {
    useServerFetch.mockResolvedValue({ data: { rating: 5 } });

    const { result } = renderHook(() => useReviewRating('123'));

    expect(result.current.status).toBe(StatusEnum.pending);
  });
});
