import { useState, useEffect } from 'react';
import axios from 'axios';

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

export const StatusEnum = {
  idel: 'IDEL',
  pending: 'PENDING',
  success: 'SUCCESS',
  error: 'ERROR',
};

function calculateAverageRating(ratings) {
  const totalScore = (1 * ratings[1] || 0)
  + (2 * ratings[2] || 0)
  + (3 * ratings[3] || 0)
  + (4 * ratings[4] || 0)
  + (5 * ratings[5] || 0);

  const totalCount = (ratings[1] || 0)
  + (ratings[2] || 0)
  + (ratings[3] || 0)
  + (ratings[4] || 0)
  + (ratings[5] || 0);

  return totalCount === 0 ? 0 : totalScore / totalCount;
}

function useReviewRating(productId) {
  const [rating, setRating] = useState(null);
  const [status, setStatus] = useState(StatusEnum.idel);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(StatusEnum.pending);
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${productId}`, { // FIXME:
      headers: {
        Authorization: 'makeItWorkLaterInEnv', // FIXME:
      },
    })
      .then((response) => {
        setStatus(StatusEnum.success);
        console.log(response.data); // FIXME:
        const { ratings } = response.data;
        setRating(calculateAverageRating(ratings));
      })
      .catch((err) => {
        setStatus(StatusEnum.error);
        setError(err.message);
      });
  }, [productId]);
  return { rating, status, error };
}

export default useReviewRating;
