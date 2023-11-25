import React from 'react';
import styled from 'styled-components';
import CharacteristicsRow from './CharacteristicsRow.jsx'; // eslint-disable-line

const Wrapper = styled.fieldset`
  text-align: left;
`;

function Characteristics({ characteristics, setCharacteristics }) { // eslint-disable-line

  const handleChange = (e) => {
    setCharacteristics((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  return (
    <Wrapper>
      <legend>Characteristics</legend>
      {/* Size */}
      <CharacteristicsRow
        char={characteristics.size} // eslint-disable-line
        charString="size"
        handleChange={handleChange}
        description={[
          'A size too small',
          'half a size too small',
          'Perfect',
          'Half a size too big',
          'A size too big',
        ]}
      />
      {/* Width */}
      <CharacteristicsRow
        char={characteristics.width} // eslint-disable-line
        charString="width"
        handleChange={handleChange}
        description={[
          'Too narrow',
          'Slightly narrow',
          'Perfect',
          'Slightly wide',
          'Too wide',
        ]}
      />
      {/* Comfort */}
      <CharacteristicsRow
        char={characteristics.comfort} // eslint-disable-line
        charString="comfort"
        handleChange={handleChange}
        description={[
          'Uncomfortable',
          'Slightly uncomfortable',
          'Ok',
          'Comfortable',
          'Perfect',
        ]}
      />
      {/* Quality */}
      <CharacteristicsRow
        char={characteristics.quality} // eslint-disable-line
        charString="quality"
        handleChange={handleChange}
        description={[
          'Poor',
          'Below average',
          'What I expected',
          'Pretty great',
          'Perfect',
        ]}
      />
      {/* Length */}
      <CharacteristicsRow
        char={characteristics.length} // eslint-disable-line
        charString="length"
        handleChange={handleChange}
        description={[
          'Runs Short',
          'Runs slightly short',
          'Perfect',
          'Runs slightly long',
          'Runs long',
        ]}
      />
      {/* Fit */}
      <CharacteristicsRow
        char={characteristics.fit} // eslint-disable-line
        charString="fit"
        handleChange={handleChange}
        description={[
          'Runs tight',
          'Runs slightly tight',
          'Perfect',
          'Runs slightly long',
          'Runs long',
        ]}
      />
    </Wrapper>
  );
}

export default Characteristics;
