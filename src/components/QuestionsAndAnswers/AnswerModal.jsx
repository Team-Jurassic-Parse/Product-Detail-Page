import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UploadPhoto from '../RatingAndReviews/ReviewForm/UploadPhoto.jsx'; //eslint-disable-line
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line

const FormWrapper = styled.form`
background: white;
max-width: 560px;
padding: 24px 36px;
display: flex;
gap: 12px;
flex-direction: column;
align-items: stretch;
justify-content: center;
font-weight: normal;
`;

const Subtitle = styled.div`
font-size: 15px;
`;

const LabelWrapper = styled.label`
font-weight: bold;
`;

const BtnWrapper = styled.button`
`;

function AnswerModal({ productName, questionBody, questionId }) { //eslint-disable-line
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (newImgs) => { setImages((curImgs) => [...curImgs, ...newImgs]); };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const data = {
      body: body,
      name: nickname,
      email: email,
      photos: images,
    };
    if (questionId) {
      axios.post(`https:app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`, data, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
      })
        .then(() => {
          setSubmitting(false);
          console.log('posted');
        })
        .catch((err) => {
          setSubmitting(false);
          console.error('Error adding answer:', err);
        });
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmitAnswer}>
      {body.length < 5 && submitting ? (
        <span> You must enter the following:</span>
      ) : null}
      <h2>Submit your Answer</h2>
      <Subtitle>
        {productName}
        :
        {' '}
        {questionBody}
      </Subtitle>
      <LabelWrapper>Your Answer</LabelWrapper>
      <textarea maxLength="1000" required onChange={(e) => setBody(e.target.value)} />
      <LabelWrapper>What is your nickname</LabelWrapper>
      <input type="text" maxLength="60" placeholder="Example: jack543!" required onChange={(e) => setNickname(e.target.value)} />
      <div>For privacy reasons, do not use your full name or email address</div>
      <LabelWrapper>Your email</LabelWrapper>
      <input type="email" maxLength="60" placeholder="Example: jack@email.com" required onChange={(e) => setEmail(e.target.value)} />
      <div>For authentication reasons, you will not be emailed</div>
      <UploadPhoto images={images} handleImageChange={handleImageChange} />
      <BtnWrapper type="submit">Submit</BtnWrapper>
    </FormWrapper>
  );
}

export default AnswerModal;
