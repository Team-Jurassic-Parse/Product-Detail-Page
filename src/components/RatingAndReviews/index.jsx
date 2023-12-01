import React, { useState } from 'react';
import styled from 'styled-components';
import RatingSummary from './RatingSummary.jsx'; // eslint-disable-line
import ReviewsList from './ReviewsList.jsx'; // eslint-disable-line
import ReviewForm from './ReviewForm.jsx'; // eslint-disable-line
import Modal from '../UI/Modal.jsx'; // eslint-disable-line
import StarsFilterProvider from './providers/StarsFilterProvider.jsx'; // eslint-disable-line
import ButtonWrapper from '../UI/StyledButton.js'; // eslint-disable-line

const Wrapper = styled.div`
  margin: 60px auto;
  padding: 0 30px;

  h2 {
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

const SearchBar = styled.input`
  width: 30%;
  height: 40px;
  border: 2px solid black;
  font-size: 21px;
  cursor: text;
  border-radius: 50px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  margin: 5px 32px;
  padding: 10px;
`;

function RatingAndReviews({
  productId, // eslint-disable-line
  productName = 'Anonymous', // eslint-disable-line
  productReview, // eslint-disable-line
  status, // eslint-disable-line
  error // eslint-disable-line
}) {
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');

  const openModal = () => {
    setShowForm(true);
  };
  const closeModal = () => {
    setShowForm(false);
  };

  const handleQuery = (e) => {
    if (e.target.value.length >= 3) {
      setQuery(e.target.value);
    } else {
      setQuery('');
    }
  };

  return (
    <Wrapper>
      <StarsFilterProvider>
        <h2>ratings and reviews</h2>
        <SearchBar
          type="search"
          placeholder="Search for reviews..."
          onChange={handleQuery}
        />
        <SummaryAndListWrapper>
          <RatingSummary
            productId={productId}
            productReview={productReview}
            status={status}
            error={error}
          />
          <ReviewsList productId={productId} key={productId} query={query} />
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
            handleClose={closeModal}
            currentCharacteristics={productReview.characteristics} // eslint-disable-line
          />
        </Modal>
      )}
    </Wrapper>
  );
}

export default RatingAndReviews;
