import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
cursor: pointer;
`;

const SuccessWrapper = styled.h2`
color: green;
`;

function QuestionModal({ productName, productId }) {
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const data = {
      body,
      name: nickname,
      email,
      product_id: productId,
    };
    axios
      .post(
        'https:app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
        data,
        {
          headers: {
            Authorization: process.env.AUTH_TOKEN,
          },
        }
      )
      .then(() => {
        setSubmitted(true);
        console.log('Posted');
      })
      .catch((err) => {
        console.error('Error adding question:', err);
      });
  };

  return (
    <FormWrapper onSubmit={handleSubmitQuestion}>
      {submitted ? (
        <SuccessWrapper>Successfully submitted!</SuccessWrapper>
      ) : null}
      <h2>Ask Your Question</h2>
      <Subtitle>About the {productName}</Subtitle>
      <LabelWrapper>Your Question (mandatory)</LabelWrapper>
      <textarea
        type="text"
        maxLength="1000"
        required
        onChange={(e) => setBody(e.target.value)}
      />
      <LabelWrapper>What is your nickname (mandatory)</LabelWrapper>
      <input
        type="text"
        maxLength="60"
        placeholder="Example: jackson11!"
        required
        onChange={(e) => setNickname(e.target.value)}
      />
      <div>For privacy reasons, do not use your full name or email address</div>
      <LabelWrapper>Your email (mandatory)</LabelWrapper>
      <input
        type="email"
        maxLength="60"
        placeholder="Example: Why did you like the product or not?"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>For authentication reasons, you will not be emailed</div>
      <BtnWrapper type="submit">Submit</BtnWrapper>
    </FormWrapper>
  );
}

export default QuestionModal;
