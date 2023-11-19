import { useState, useEffect } from 'react';
import useServerFetch from '../useServerFetch';

export const StatusEnum = {
  idel: 'IDEL',
  pending: 'PENDING',
  success: 'SUCCESS',
  error: 'ERROR',
};

/**
* Custom hook for fetching and managing review ratings based on a product ID.
*
* @param {string} productId - The product id used to fetch data.
* @returns {{
*   rating: number | null,
*   status: 'IDEL' | 'PENDING' | 'SUCCESS' | 'ERROR',
*   error: string | null
* }} An object containing the rating, current status of the fetch operation, and any error message.
*/

function useReviewRating(productId) {
  const [productReview, setProductReview] = useState({});
  const [status, setStatus] = useState(StatusEnum.idel);
  const [error, setError] = useState(null);

  const reviewsFetchController = new AbortController();

  useEffect(() => {
    setStatus(StatusEnum.pending);
    useServerFetch('get', `reviews/meta?product_id=${productId}`, {}, reviewsFetchController)
      .then((response) => {
        setStatus(StatusEnum.success);
        setProductReview(response.data);
      })
      .catch((err) => {
        setStatus(StatusEnum.error);
        setError(err.message);
      });

    return () => {
      reviewsFetchController.abort();
    };
  }, [productId]);
  return { productReview, status, error };
}

export default useReviewRating;
