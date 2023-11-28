import React from 'react';
import styled from 'styled-components';
import StarsRating from '../ReviewStars/StarsRating.jsx'; // eslint-disable-line
import ReviewCardHelpfulness from './ReviewCardHelpfulness.jsx'; // eslint-disable-line

const Wrapper = styled.li``;

function ReviewCard({ review }) { // eslint-disable-line
  const { body, rating, recommend, date } = review; // eslint-disable-line
  const formatedDate = new Intl.DateTimeFormat('en-US').format(new Date(date));
  return (
    <Wrapper>
      <p>
        {body}
        <span>{formatedDate}</span>
      </p>
      <StarsRating stars={rating} />
      {recommend && <p>Recommend</p>}
      <ReviewCardHelpfulness
        // eslint-disable-next-line react/prop-types
        reviewId={review?.review_id}
        // eslint-disable-next-line react/prop-types
        helpfulness={review?.helpfulness}
      />
    </Wrapper>
  );
}

export default ReviewCard;
