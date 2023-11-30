import React from 'react';
import styled from 'styled-components';
import Question from './Question.jsx'; //eslint-disable-line

const Wrapper = styled.div`
  background: white;
  max-height: 80vh;
  padding: 4px 4px;
  overflow: auto;
  width: 90%;
  margin: 0px 64px;
  padding-left: 30px;
`;

function QuestionsList({ questions, currentQuestions, query, productName}) { //eslint-disable-line
  const formatQuery = query.toLowerCase().trim();
  return (
    <Wrapper>
      {currentQuestions
        .filter((question) => {
          return formatQuery === ''
          ? question : question.question_body.toLowerCase().trim().includes(formatQuery)
        })
        .map((question) => {
          return <Question key={question.question_id} questionId={question.question_id} question={question} productName={productName}/>
        })}
    </Wrapper>
  );
}

export default QuestionsList;
