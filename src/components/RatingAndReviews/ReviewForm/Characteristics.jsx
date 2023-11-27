import React from 'react';
import styled from 'styled-components';
import CharacteristicsRow from './CharacteristicsRow.jsx'; // eslint-disable-line

const descriptioinMap = {
  size: [
    'A size too small',
    'half a size too small',
    'Perfect',
    'Half a size too big',
    'A size too big',
  ],
  width: [
    'Too narrow',
    'Slightly narrow',
    'Perfect',
    'Slightly wide',
    'Too wide',
  ],
  comfort: [
    'Uncomfortable',
    'Slightly uncomfortable',
    'Ok',
    'Comfortable',
    'Perfect',
  ],
  quality: [
    'Poor',
    'Below average',
    'What I expected',
    'Pretty great',
    'Perfect',
  ],
  length: [
    'Runs Short',
    'Runs slightly short',
    'Perfect',
    'Runs slightly long',
    'Runs long',
  ],
  fit: [
    'Runs tight',
    'Runs slightly tight',
    'Perfect',
    'Runs slightly long',
    'Runs long',
  ],
};

const Wrapper = styled.fieldset`
  text-align: left;
`;

function Characteristics({ characteristics, setCharacteristics }) { // eslint-disable-line

  const handleChange = (e) => {
    setCharacteristics((cur) => ({
      ...cur,
      [e.target.name]: { id: cur[e.target.name].id, value: e.target.value },
    }));
  };

  return (
    <Wrapper>
      <legend>Characteristics</legend>
      {characteristics
        && Object.keys(characteristics).map((key) => (
          <CharacteristicsRow
            key={key}
            char={characteristics[key].value} // eslint-disable-line
            charString={key}
            handleChange={handleChange}
            description={descriptioinMap[key]}
          />
        ))}
    </Wrapper>
  );
}

export default Characteristics;
