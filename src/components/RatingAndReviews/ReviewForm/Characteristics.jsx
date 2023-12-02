import React from 'react';
import styled from 'styled-components';
import CharacteristicsRow from './CharacteristicsRow.jsx';
import descriptioinMap from '../utils/descriptioinMap.js';

const Wrapper = styled.fieldset`
  text-align: center;
  border: 1px solid #ccc;
  padding: 12px;
  margin: 12px 0;
  text-transform: capitalize;

  legend {
    padding: 0 10px;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const GripWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(5, 2fr);
  justify-content: center;
  align-items: stretch;
  text-align: center;
  row-gap: 24px;
  column-gap: 8px;
`;

function Characteristics({ characteristics, setCharacteristics }) {

  const handleChange = (e) => {
    setCharacteristics((cur) => ({
      ...cur,
      [e.target.name]: { id: cur[e.target.name].id, value: e.target.value },
    }));
  };

  return (
    <Wrapper>
      <legend>Characteristics</legend>
      <GripWrapper>
        {characteristics
        && Object.keys(characteristics).map((key) => (
          <CharacteristicsRow
            key={key}
            char={characteristics[key].value}
            charString={key}
            handleChange={handleChange}
            description={descriptioinMap[key]}
          />
        ))}
      </GripWrapper>
    </Wrapper>
  );
}

export default Characteristics;
