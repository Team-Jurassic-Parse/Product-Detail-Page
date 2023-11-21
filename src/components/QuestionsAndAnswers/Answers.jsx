import React, { useState, useEffect } from 'react';
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line

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
            <div key={answerId}>
              A:
              {answer.body}
            </div>
            <div>
              <span>by: </span>
              {answer.answerer_name === 'Seller'
                ? <strong>{answer.answerer_name}</strong>
                : answer.answerer_name}
              <span>, </span>
              {formatedDate}
            </div>
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
