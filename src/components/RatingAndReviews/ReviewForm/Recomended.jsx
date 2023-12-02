import React, { useId } from 'react';
import styled from 'styled-components';

const Wrapper = styled.fieldset`
  border: 1px solid #ccc;
  padding: 12px;
  margin: 12px 0;

  legend {
    padding: 0 10px;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;
function Recomended({ recommend, setRecommend }) {
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
      <label htmlFor={`${id}-recomend-yes`}>Yes</label>
      <br />
      <input
        id={`${id}-recomend-no`}
        type="radio"
        name="recommend"
        value="no"
        checked={recommend === 'no'}
        onChange={handleChange}
      />
      <label htmlFor={`${id}-recomend-no`}>No</label>
    </Wrapper>
  );
}

export default Recomended;
