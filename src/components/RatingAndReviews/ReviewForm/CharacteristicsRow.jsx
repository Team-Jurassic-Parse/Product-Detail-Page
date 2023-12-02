import React, { useId } from 'react';
import styled from 'styled-components';

const CharText = styled.span`
  border-right: 1px solid #e5e7eb;
  text-transform: capitalize;
  font-weight: bold;
  align-self: center;
  justify-self: center;
`;

const GroupWrapper = styled.div`
  border-right: 1px solid #e5e7eb;
  padding: 0 6px;
  input {
    align-self: center;
    justify-self: center;
  }
  label {
    align-self: center;
    justify-self: center;
  }
`;

function CharacteristicsRow({ char, handleChange, charString, description }) {
  const id = useId();
  return (
    <>
      <CharText>{charString}</CharText>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-1`}
          type="radio"
          name={charString}
          value="1"
        checked={char === '1'}
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-1`}>{description[0]}</label>
      </GroupWrapper>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-2`}
          type="radio"
          name={charString}
          value="2"
        checked={char === '2'}
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-2`}>{description[1]}</label>
      </GroupWrapper>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-3`}
          type="radio"
          name={charString}
          value="3"
        checked={char === '3'}
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-3`}>{description[2]}</label>
      </GroupWrapper>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-4`}
          type="radio"
          name={charString}
          value="4"
        checked={char === '4'}
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-4`}>{description[3]}</label>
      </GroupWrapper>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-5`}
          type="radio"
          name={charString}
          value="5"
        checked={char === '5'}
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-5`}>{description[4]}</label>
      </GroupWrapper>
    </>
  );
}

export default CharacteristicsRow;
