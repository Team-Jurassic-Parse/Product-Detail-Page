/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import StarsRating from '../../ReviewStars/StarsRating.jsx';
import ReviewCardHelpfulness from './ReviewCardHelpfulness.jsx';
import ReviewCardPhoto from './ReviewCardPhoto.jsx';
import ReviewResponse from './ReviewResponse.jsx';

const Wrapper = styled.li`
  width: 100%;
`;

const StarUserDateWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const NameSpan = styled.span`
  margin-left: auto;
`;
const DateSpan = styled.span``;

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function ReviewCard({ review }) {
  console.log(review);
  const {
    summary, body, rating, recommend, reviewer_name: reviewerName, date: rawDate, photos, response,
  } = review;
  const date = new Date(rawDate);
  const formattedDate = `${monthNames[date?.getMonth()]} ${
    date?.getDate()} ${
    date?.getFullYear()}`;
  return (
    <Wrapper>
      <StarUserDateWrapper>
        <StarsRating stars={rating} />
        <NameSpan>{reviewerName}</NameSpan>
        <DateSpan>{formattedDate}</DateSpan>
      </StarUserDateWrapper>
      <h2>
        {summary}
      </h2>
      <p>
        {body}
      </p>
      {photos.map((photo) => (<ReviewCardPhoto photo={photo} key={photo.id} />))}
      {response && <ReviewResponse response={response} />}
      {recommend && <p>Recommend</p>}
      <ReviewCardHelpfulness
        reviewId={review?.review_id}
        helpfulness={review?.helpfulness}
      />
    </Wrapper>
  );
}

export default ReviewCard;
