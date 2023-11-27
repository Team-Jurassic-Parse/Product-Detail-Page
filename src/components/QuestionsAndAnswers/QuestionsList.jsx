import React from 'react';
import styled from 'styled-components';
import Question from './Question.jsx'; //eslint-disable-line

//adjust css later
const Wrapper = styled.div`
  background: white;
  max-height: 100vh;
  padding: 4px 4px;
  overflow-y: scroll;
  max-width: 100vw;
`;

function QuestionsList({ questions, currentQuestions, query}) { //eslint-disable-line
  const formatQuery = query.toLowerCase().trim();
  return (
    <Wrapper>
      {currentQuestions
        .filter((question) => {
          return formatQuery === ''
          ? question : question.question_body.toLowerCase().trim().includes(formatQuery)
        })
        .map((question) => {
          return <Question key={question.question_id} questionId={question.question_id} question={question} />
        })}
    </Wrapper>
  );
}

export default QuestionsList;
