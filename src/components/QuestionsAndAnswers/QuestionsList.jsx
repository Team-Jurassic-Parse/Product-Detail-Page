import React, { useState } from 'react';
import styled from 'styled-components';
import Answers from './Answers.jsx'; //eslint-disable-line

const Wrapper = styled.form`
  background: white;
  padding: 10px 25px;
  font-size: 19px;
  font-weight: bold;
`;

const InnerWrapper = styled.form`
  background: lightgrey;
  margin-top: 10px;
  margin-bottom: 10px;
`;

function QuestionsList({ questions }) { //eslint-disable-line
  return questions ? (
    <Wrapper>
      {questions.map((question) => { //eslint-disable-line
        const questionId = question.question_id;
        return (
          <InnerWrapper key={questionId}>
            Q:
            {question.question_body}
            <Answers questionId={questionId} />
          </InnerWrapper>
        );
      })}
      <button type="button">More answered questions</button>
    </Wrapper>
  ) : (
    <div> Loading questions </div>
  );
}

export default QuestionsList;
