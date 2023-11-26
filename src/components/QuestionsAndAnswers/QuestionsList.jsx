import React from 'react';
import styled from 'styled-components';
import Question from './Question.jsx'; //eslint-disable-line

//adjust css later
const Wrapper = styled.div`
  background: white;
  min-height: 50px;
  max-height: 50vh;
  padding: 10px 25px;
  overflow: scroll;
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
