import React, { useState } from 'react';
import Answers from './Answers.jsx'; //eslint-disable-line

function QuestionsList({ questions }) { //eslint-disable-line
  return questions ? (
    <div>
      {questions.map((question) => { //eslint-disable-line
        const questionId = question.question_id;
        return (
          <div>
            Q:
            {question.question_body}
            <Answers questionId={questionId} />
          </div>
        );
      })}
      <button type="button">More answered questions</button>
    </div>
  ) : (
    <div> Loading questions </div>
  );
}

export default QuestionsList;
