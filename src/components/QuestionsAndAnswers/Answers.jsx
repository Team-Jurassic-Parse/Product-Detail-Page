import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line

const AnswerWrapper = styled.div`
  font-weight: normal;
  padding: 5px;
`;

const BelowAnswer = styled.div`
  padding: 5px 25px;
  font-size: 15px;
  font-weight: bold;
`;

function Answers({ answer }) {
  //eslint-disable-line
  const [helpful, setHelpful] = useState(false);
  const [reported, setReported] = useState(false);
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);

  const handleHelpful = (id) => {
    if (!helpful) {
      useServerFetch('put', `qa/answers/${id}/helpful`, {})
        .then(() => {
          setHelpfulness(helpfulness + 1);
          setHelpful(true);
          toast.success('Upvote Successful');
        })
        .catch((err) => console.error(err));
    }
  };

  const handleReport = (id) => {
    if (!reported) {
      useServerFetch('put', `qa/answers/${id}/report`, {})
        .then(() => {
          setReported(true);
          toast.success('Report Successful');
        })
        .catch((err) => console.error(err));
    }
  };

  const formatedDate = new Date(answer.date).toLocaleDateString(
    {},
    {
      timeZone: 'UTC',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  );

  return answer ? (
    <div key={answer.answer_id}>
      <AnswerWrapper>A: {answer.body}</AnswerWrapper>
      <BelowAnswer>
        <span>by: </span>
        {answer.answerer_name === 'Seller' ? (
          <strong>{answer.answerer_name}</strong>
        ) : (
          answer.answerer_name
        )}
        <span>  |  </span>
        {formatedDate}
        {'  '}
        |  Helpful?
        {' '}
        <span
          style={{
            textDecoration: helpful ? 'none' : 'underline',
            cursor: helpful ? 'default' : 'pointer',
            opacity: helpful? '0.5' : 'default',
         }}
          onClick={() => {
            handleHelpful(answer.answer_id);
          }}
        >
          Yes
        </span>
        {' '}
        ({helpfulness})  |{'  '}
        <span
          style={{
            textDecoration: reported ? 'none' : 'underline',
            cursor: reported ? 'default' : 'pointer',
            opacity: reported? '0.5' : 'default'
          }}
          onClick={() => {
            handleReport(answer.answer_id);
          }}
        >
          {reported ? 'Reported' : 'Report'}
        </span>
      </BelowAnswer>
    </div>
  ) : (
    <div>Loading answers</div>
  );
}

export default Answers;
