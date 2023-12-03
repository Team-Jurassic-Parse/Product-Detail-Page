import React from 'react';
import styled from 'styled-components';
import Question from './Question.jsx';

const Wrapper = styled.div`
  background: white;
  max-height: 80vh;
  overflow: auto;
  margin: 24px auto;
  padding: 0 30px;
  padding-left: 75px;
`;

function QuestionsList({ questions, currentQuestions, query, productName}) {
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
