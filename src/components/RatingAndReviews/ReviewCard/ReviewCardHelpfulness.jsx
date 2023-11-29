import React, { useState } from 'react';
import styled from 'styled-components';
import useServerFetch from '../../../hooks/useServerFetch.js' // eslint-disable-line

const Wrapper = styled.div`
  display: flex;
  gap: 4px;

  button {
  }

  button:hover {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

export default function ReviewCardHelpfulness({ reviewId, helpfulness }) { // eslint-disable-line
  const [clicked, setClicked] = useState(false);
  const [localHelpfulness, setLocalHelpfulness] = useState(helpfulness);

  const handleClickYes = () => {
    setClicked(true);
    useServerFetch('put', `reviews/${reviewId}/helpful`, {})
      .then((res) => {
        setLocalHelpfulness((cur) => cur + 1);
        console.log(res);
      }) // FIXME: toast
      .catch((err) => console.log(err)); // FIXME: toast
  };
  const handleClickNo = () => {
    setClicked(true);
  };

  return (
    <Wrapper>
      <span>Helpful?</span>
      <button type="button" onClick={handleClickYes} disabled={clicked}>Yes</button>
      <span>
        #
        {localHelpfulness}
      </span>
      <button type="button" onClick={handleClickNo} disabled={clicked}>No</button>
    </Wrapper>
  );
}
