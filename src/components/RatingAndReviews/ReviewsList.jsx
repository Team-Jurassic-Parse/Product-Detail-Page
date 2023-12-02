/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { StatusEnum } from '../../hooks/ReviewStars/useReviewsRating';
import ReviewCard from './ReviewCard/ReviewCard.jsx';
import filterReviewsByStars from './utils/filterReviewsByStars.js';
import filterReviewsByQuery from './utils/filterReviewsByQuery.js';
import useStarsFilter from './hooks/useStarsFilter.js';
import ButtonWrapper from '../UI/StyledButton.js';

const Wrapper = styled.div`
  flex: 2;
  padding: 24px 32px;
  padding-left: 43px;
  max-height: 100vh;
  overflow: auto;
`;

const FilterWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 12px;

  &::before {
    content: "Sorted By:";
    top: 0;
    left: 0;
    padding: 8px;
    font-size: 16px;
    color: #222;
  }

  &::after {
    position: relative;
    top: 2px;
    right: 1px;
    content: "▼";
    color: #999;
  }
`;

const FilterSelector = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

function ReviewsList({ productId, query }) { // eslint-disable-line

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');
  const [haveMoreReviews, setHaveMoreReviews] = useState(true);
  const [status, setStatus] = useState(StatusEnum.idel);
  const [error, setError] = useState(null);

  const { starsFilter } = useStarsFilter();

  const reviewsFetchController = new AbortController();
  useEffect(() => {
    if (!productId) return () => {};
    setStatus(StatusEnum.pending);
    axios
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', {
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
        setReviews((currentReviews) => [...currentReviews, ...results]);
        if (results.length < 2) {
          setHaveMoreReviews(false);
        }
      })
      .catch((err) => {
        setStatus(StatusEnum.error);
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
    setHaveMoreReviews(true);
    setSort(event.target.value);
  };

  return (
    <Wrapper>
      <FilterWrapper>
        <FilterSelector value={sort} onChange={handleChangeSort}>
          <option value="relevant">Relevant</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </FilterSelector>
      </FilterWrapper>
      {status !== StatusEnum.error && reviews.length === 0 ? (
        <p>No Reviews yet</p>
      ) : (
        <UnorderedList>
          {filterReviewsByQuery(filterReviewsByStars(reviews, starsFilter), query).map((review) => (
            <ReviewCard key={review.review_id} review={review} />
          ))}
        </UnorderedList>
      )}
      {/* FIXME: fancier pending state. */}
      {status === StatusEnum.pending && <p>Loading Data...</p>}
      {status === StatusEnum.error && <p>{error}</p>}
      {haveMoreReviews && (
        <ButtonWrapper width="100px" onClick={handleShowMore} type="button">
          Show More
        </ButtonWrapper>
      )}
    </Wrapper>
  );
}

export default React.memo(ReviewsList);
