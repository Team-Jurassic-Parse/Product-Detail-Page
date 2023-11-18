import React, { useState } from 'react';
import styled from 'styled-components';
import RatingSummary from './RatingSummary.jsx'; // eslint-disable-line
import ReviewsList from './ReviewsList.jsx'; // eslint-disable-line
import ReviewForm from './ReviewForm.jsx'; // eslint-disable-line
import Modal from '../UI/Modal.jsx' // eslint-disable-line

const Wrapper = styled.div`
  border: 1px solid;
`;

const SummaryAndListWrapper = styled.div`
  border: 1px solid red;
  display: flex;
`;

const BtnWrapper = styled.div`
  background-color: beige;
`;

const AddFormBtn = styled.button`
  display: block;
  margin: auto;
`;

function RatingAndReviews({ productId }) { // eslint-disable-line

  const [showForm, setShowForm] = useState(false);
  const openModal = () => { setShowForm(true); };
  const closeModal = () => { setShowForm(false); };

  return (
    <Wrapper>
      <SummaryAndListWrapper>
        <RatingSummary />
        <ReviewsList />
      </SummaryAndListWrapper>
      <BtnWrapper>
        <AddFormBtn onClick={openModal}>Add +</AddFormBtn>
      </BtnWrapper>
      {showForm && <Modal handleClose={closeModal}><ReviewForm /></Modal>}
    </Wrapper>
  );
}

export default RatingAndReviews;
