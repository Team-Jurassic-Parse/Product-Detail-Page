import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line

const AnswerWrapper = styled.div`
  font-size: 16px;
  font-weight: normal;
  padding: 5px;
`;

const BelowAnswer = styled.div`
  padding: 5px 25px;
  font-size: 15px;
  font-weight: lighter;
`;

function Answers({ questionId }) { //eslint-disable-line
  const [answers, setAnswers] = useState([]);
  const [helpful, setHelpful] = useState({});
  const [reported, setReported] = useState({});
  const answerFetchController = new AbortController();

  // const sortResponse = answers.sort((a, b) => b.helpfulness - a.helpfulness);

  const handleFetch = () => {
    if (questionId) {
      useServerFetch('get', `qa/questions/${questionId}/answers?count=15`, {}, answerFetchController)
        .then((response) => {
          // console.log('this is the results from handleFetch:', response.data.results);
          const sortResponse = response.data.results.sort((a, b) => b.helpfulness - a.helpfulness);
          setAnswers(sortResponse);
        })
        .catch(() => setAnswers(null));
    }
    return (() => {
      answerFetchController.abort();
    });
  };

  const handleHelpful = (id) => {
    if (!helpful[id]) {
      setHelpful({ ...helpful, [id]: true });
      useServerFetch('put', `qa/answers/${id}/helpful`, {})
        .then(() => handleFetch())
        .catch((err) => console.error(err));
    }
  };

  const handleReport = (id) => {
    if (!reported[id]) {
      useServerFetch('put', `qa/answers/${id}/report`, {})
        .then(() => setReported({ ...reported, [id]: true }))
        .catch((err) => console.error(err));
    }
  };
  useEffect(() => {
    handleFetch();
  }, [questionId]);

  return answers ? (
    <>
    {/* {console.log('this is answers:', answers)} */}
    {/* {console.log('this is sorted answers:', sortResponse)} */}
      {answers.map((answer) => {
        const formatedDate = new Date(answer.date).toLocaleDateString(
          {},
          {
            timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric',
          },
        );
        const answerId = answer.answer_id;
        return (
          <div key={answerId}>
            <AnswerWrapper>
              A:
              {answer.body}
            </AnswerWrapper>
            <BelowAnswer>
              <span>by: </span>
              {answer.answerer_name === 'Seller'
                ? <strong>{answer.answerer_name}</strong>
                : answer.answerer_name}
              <span>, </span>
              {formatedDate} | Helpful?
              <span onClick={() => {handleHelpful(answerId)}}> Yes</span> ({answer.helpfulness})
              | <span onClick={() => {handleReport(answerId)}}>{reported[answerId] ? 'Reported' : 'Report'}</span>
            </BelowAnswer>
            { answers.length > 2 && <button type="button">See more answers</button>}
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
