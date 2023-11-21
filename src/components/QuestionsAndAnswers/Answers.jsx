import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line

const AnswerWrapper = styled.form`
  font-size: 16px;
  font-weight: normal;
  padding: 5px;
`;

const BelowAnswer = styled.form`
  padding: 5px 25px;
  font-size: 15px;
  font-weight: lighter;
`;

function Answers({ questionId }) { //eslint-disable-line
  const [answers, setAnswers] = useState([]);
  const answerFetchController = new AbortController();

  useEffect(() => {
    if (questionId) {
      useServerFetch('get', `qa/questions/${questionId}/answers`, {}, answerFetchController)
        .then((response) => {
          setAnswers(response.data.results);
        })
        .catch(() => setAnswers(null));
    }
    return (() => {
      answerFetchController.abort();
    });
  }, [questionId]);
  return answers ? (
    <>
      {answers.map((answer) => {
        const formatedDate = new Date(answer.date).toLocaleDateString(
          {},
          {
            timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric',
          },
        );
        const answerId = answer.answer_id;
        return (
          <div>
            <AnswerWrapper key={answerId}>
              A:
              {answer.body}
            </AnswerWrapper>
            <BelowAnswer>
              <span>by: </span>
              {answer.answerer_name === 'Seller'
                ? <strong>{answer.answerer_name}</strong>
                : answer.answerer_name}
              <span>, </span>
              {formatedDate}
            </BelowAnswer>
          </div>
        );
      })}
    </>
  ) : (
    <div>
      Loading answers
    </div>
  );
}

export default Answers;
