import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { StatusEnum } from '../../hooks/ReviewStars/useReviewsRating';
import ReviewCard from './ReviewCard.jsx'; // eslint-disable-line

const Wrapper = styled.div`
  background: blue;
  flex: 2;
  min-height: 200px; // FIXME:
  max-height: 100vh;
  overflow: scroll;
`;

const UnorderedList = styled.ul`
  border: 1px solid;
  list-style-type: none;
`;

function ReviewsList({ productId }) { // eslint-disable-line

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');
  const [haveMoreReviews, setHaveMoreReviews] = useState(true);
  const [status, setStatus] = useState(StatusEnum.idel);
  const [error, setError] = useState(null);

  const reviewsFetchController = new AbortController();
  useEffect(() => {
    if (!productId) return () => {};
    setStatus(StatusEnum.pending);
    console.log({ sort_by: sort }); // FIXME:
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
      signal: reviewsFetchController.signal,
      params: {
        product_id: productId,
        page,
        count: 2,
        sort,
      },
    })
      .then((response) => {
        setStatus(StatusEnum.success);
        const { results } = response.data;
        setReviews((currentReviews) => ([...currentReviews, ...results]));
        if (results.length < 2) {
          setHaveMoreReviews(false);
        }
      })
      .catch((err) => {
        setStatus(StatusEnum.error);
        console.log(err);
        setError(err.message);
      });

    return () => {
      reviewsFetchController.abort();
    };
  }, [page, sort, productId]);

  const handleShowMore = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const handleChangeSort = (event) => {
    setPage(1);
    setReviews([]);
    setSort(event.target.value);
  };

  return (
    <Wrapper>
      <select value={sort} onChange={handleChangeSort}>
        <option value="relevant">Relevant</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
      {
      status !== StatusEnum.error && reviews.length === 0 ? <p>No Reviews yet</p>
        : (
          <UnorderedList>
            { reviews.map((review) => (<ReviewCard key={review.review_id} review={review} />))}
          </UnorderedList>
        )
      }
      {/* FIXME: fancier pending state. */}
      {status === StatusEnum.pending && <p>Loading Data...</p>}
      {status === StatusEnum.error && <p>{error}</p>}
      {haveMoreReviews && <button onClick={handleShowMore} type="button">Show More</button>}
    </Wrapper>
  );
}

export default React.memo(ReviewsList);
