import React, { useState } from 'react';
import styled from 'styled-components';

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

function AnswerModal({ productName, questionBody }) {
  return (
    <FormWrapper>
      <h2>Submit your Answer</h2>
      <Subtitle>{productName}: {questionBody}</Subtitle>
      <LabelWrapper>Your Answer</LabelWrapper>
      <textarea></textarea>
      <LabelWrapper>What is your nickname</LabelWrapper>
      <input type='text' maxLength='60' placeholder='Example: jack543!'></input>
      <div>For privacy reasons, do not use your full name or email address</div>
      <LabelWrapper>Your email</LabelWrapper>
      <input type='text' maxLength='60' placeholder='Example: jack@email.com'></input>
      <div>For authentication reasons, you will not be emailed</div>
      <BtnWrapper>Submit</BtnWrapper>
    </FormWrapper>
  )
}

export default AnswerModal;
