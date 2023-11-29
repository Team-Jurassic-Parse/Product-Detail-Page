import React, { useState } from 'react';
import styled from 'styled-components';
import RatingSummary from './RatingSummary.jsx'; // eslint-disable-line
import ReviewsList from './ReviewsList.jsx'; // eslint-disable-line
import ReviewForm from './ReviewForm.jsx'; // eslint-disable-line
import Modal from '../UI/Modal.jsx'; // eslint-disable-line
import StarsFilterProvider from './providers/StarsFilterProvider.jsx'; // eslint-disable-line
import ButtonWrapper from '../UI/StyledButton.js'; // eslint-disable-line

const Wrapper = styled.div`
  margin: 24px 64px;

  h1 {
    text-transform: uppercase;
    padding-left: 30px;
  }
`;

const SummaryAndListWrapper = styled.div`
  display: flex;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px auto;
`;

function RatingAndReviews({
  productId, // eslint-disable-line
  productName = 'Anonymous', // eslint-disable-line
  productReview, // eslint-disable-line
  status, // eslint-disable-line
  error // eslint-disable-line
}) {
  const [showForm, setShowForm] = useState(false);
  const openModal = () => {
    setShowForm(true);
  };
  const closeModal = () => {
    setShowForm(false);
  };

  return (
    <Wrapper>
      <StarsFilterProvider>
        <h1>ratings and reviews</h1>
        <SummaryAndListWrapper>
          <RatingSummary
            productId={productId}
            productReview={productReview}
            status={status}
            error={error}
          />
          <ReviewsList productId={productId} key={productId} />
        </SummaryAndListWrapper>
      </StarsFilterProvider>
      {status === 'SUCCESS' && (
        <BtnWrapper>
          <ButtonWrapper width="120px" onClick={openModal}>Add +</ButtonWrapper>
        </BtnWrapper>
      )}
      {showForm && (
        <Modal handleClose={closeModal}>
          <ReviewForm
            productName={productName}
            productId={productId}
            currentCharacteristics={productReview.characteristics} // eslint-disable-line
          />
        </Modal>
      )}
    </Wrapper>
  );
}

export default RatingAndReviews;
