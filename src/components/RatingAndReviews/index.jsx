import React, { useState } from 'react';
import styled from 'styled-components';
import RatingSummary from './RatingSummary.jsx'; // eslint-disable-line
import ReviewsList from './ReviewsList.jsx'; // eslint-disable-line
import ReviewForm from './ReviewForm.jsx'; // eslint-disable-line
import Modal from '../UI/Modal.jsx'; // eslint-disable-line
import StarsFilterProvider from './providers/StarsFilterProvider.jsx'; // eslint-disable-line

const Wrapper = styled.div`
  border: 1px solid;
`;

const SummaryAndListWrapper = styled.div`
  display: flex;
`;

const BtnWrapper = styled.div``;

const AddFormBtn = styled.button`
  display: block;
  margin: auto;
`;

function RatingAndReviews({
  productId, // eslint-disable-line
  productName = 'Anonymous', // eslint-disable-line
  productReview, // eslint-disable-line
  status, // eslint-disable-line
  error, // eslint-disable-line
}) {
  const [showForm, setShowForm] = useState(false);
  const openModal = () => {
    setShowForm(true);
  };
  const closeModal = () => {
    setShowForm(false);
  };
  const [showWidget, setShowWidget] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setShowWidget((cur) => !cur);
        }}
      >
        Toggle Lance&apos;s widget
      </button>
      {showWidget && (
        <Wrapper>
          <StarsFilterProvider>
            <SummaryAndListWrapper>
              <RatingSummary
                productId={productId}
                productReview={productReview}
                status={status}
                error={error}
              />
              <ReviewsList productId={productId} />
            </SummaryAndListWrapper>
          </StarsFilterProvider>
          {status === 'SUCCESS' && (
            <BtnWrapper>
              <AddFormBtn onClick={openModal}>Add +</AddFormBtn>
            </BtnWrapper>
          )}
          {showForm && (
            <Modal handleClose={closeModal}>
              <ReviewForm productName={productName} productId={productId} />
            </Modal>
          )}
        </Wrapper>
      )}
    </div>
  );
}

export default RatingAndReviews;
