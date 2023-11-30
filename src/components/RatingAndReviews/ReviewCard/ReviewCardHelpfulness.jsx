import React, { useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import useServerFetch from '../../../hooks/useServerFetch.js' // eslint-disable-line

const Wrapper = styled.div`
  display: flex;
  gap: 4px;

  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    text-decoration: underline;
  }

  button:hover {
    text-decoration: none;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

const DisableSpan = styled.span`
  color: ${(p) => (p.disabled ? '#aaa' : '#111')};
`;

export default function ReviewCardHelpfulness({ reviewId, helpfulness }) { // eslint-disable-line
  const [clicked, setClicked] = useState(false);
  const [localHelpfulness, setLocalHelpfulness] = useState(helpfulness);

  const handleClickYes = () => {
    setClicked(true);
    useServerFetch('put', `reviews/${reviewId}/helpful`, {})
      .then(() => {
        setLocalHelpfulness((cur) => cur + 1);
        toast.success('Upvote cuccess');
      })
      .catch((err) => toast.error(err?.message));
  };

  return (
    <Wrapper>
      <span>
        Helpful?
        {'  '}
      </span>
      <button type="button" onClick={handleClickYes} disabled={clicked}>Yes</button>
      <DisableSpan disabled={clicked}>
        (
        {localHelpfulness}
        )
      </DisableSpan>
    </Wrapper>
  );
}
