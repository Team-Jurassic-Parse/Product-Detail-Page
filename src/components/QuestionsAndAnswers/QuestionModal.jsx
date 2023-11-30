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
  background: #000000;
  display: table;
  width: 120px;
  height: 30px;
  color: #fff;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  opacity: 1;
  transition: background 0.2s ease;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    opacity: 0.5;
  }
`;

const SuccessWrapper = styled.h2`
  color: green;
`;

const ExitButton = styled.button`
  background: #000000;
  display: table;
  position: relative;
  top: -489px;
  right: -371px;
  width: 35px;
  height: 35px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  opacity: 1;
  transition: background 0.2s ease;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    opacity: 0.5;
  }
`;

function QuestionModal({ productName, productId, closeModal}) {
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
      <h3>Ask Your Question</h3>
      <Subtitle>
        About the {productName}
      </Subtitle>
      <LabelWrapper>
        Your Question
        <span style={{ color: 'red' }}> *</span>
      </LabelWrapper>
      <textarea
        style={{ height: '100px', resize: 'none' }}
        type="text"
        maxLength="1000"
        required
        onChange={(e) => setBody(e.target.value)}
      />
      <LabelWrapper>
        What is your nickname
        <span style={{ color: 'red' }}> *</span>
      </LabelWrapper>
      <input
        type="text"
        maxLength="60"
        placeholder="Example: jackson11!"
        required
        onChange={(e) => setNickname(e.target.value)}
      />
      <div>For privacy reasons, do not use your full name or email address</div>
      <LabelWrapper>
        Your email
        <span style={{ color: 'red' }}> *</span>
      </LabelWrapper>
      <input
        type="email"
        maxLength="60"
        placeholder="Example: Why did you like the product or not?"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>For authentication reasons, you will not be emailed</div>
      <BtnWrapper type="submit">Submit</BtnWrapper>
      <ExitButton onClick={closeModal}>X</ExitButton>
    </FormWrapper>
  );
}

export default QuestionModal;
