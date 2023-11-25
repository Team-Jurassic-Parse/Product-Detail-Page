import React, { useId } from 'react';
import styled from 'styled-components';

const Wrapper = styled.fieldset``;
function Recomended({ recommend, setRecommend }) { // eslint-disable-line
  const id = useId();
  const handleChange = (e) => setRecommend(e.target.value);

  return (
    <Wrapper>
      <legend>Do you recommend this product?</legend>
      <input
        id={`${id}-recomend-yes`}
        type="radio"
        name="recommend"
        value="yes"
        checked={recommend === 'yes'}
        onChange={handleChange}
      />
      <label htmlFor={`${id}-recomend-yes`}>Yes</label> {/* eslint-disable-line */}
      <br />
      <input
        id={`${id}-recomend-no`}
        type="radio"
        name="recommend"
        value="no"
        checked={recommend === 'no'}
        onChange={handleChange}
      />
      <label htmlFor={`${id}-recomend-no`}>No</label> {/* eslint-disable-line */}
    </Wrapper>
  );
}

export default Recomended;
