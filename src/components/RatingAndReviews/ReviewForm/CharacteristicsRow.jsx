import React, { useId } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  span {
    text-transform: capitalize;
    margin-right: 6px;
  }
`;

function CharacteristicsRow({ char, handleChange, charString, description }) { // eslint-disable-line
  const id = useId();
  return (
    <Wrapper>
      <span>{charString}</span>
      <input
        id={`${id}-${charString}-1`}
        type="radio"
        name={charString}
        value="1"
        checked={char === '1'} // eslint-disable-line
        onChange={handleChange}
      />
      <label htmlFor={`${id}-${charString}-1`}>{description[0]}</label> {/* eslint-disable-line */}
      <input
        id={`${id}-${charString}-2`}
        type="radio"
        name={charString}
        value="2"
        checked={char === '2'} // eslint-disable-line
        onChange={handleChange}
      />
      <label htmlFor={`${id}-${charString}-2`}>{description[1]}</label> {/* eslint-disable-line */}
      <input
        id={`${id}-${charString}-3`}
        type="radio"
        name={charString}
        value="3"
        checked={char === '3'} // eslint-disable-line
        onChange={handleChange}
      />
      <label htmlFor={`${id}-${charString}-3`}>{description[2]}</label> {/* eslint-disable-line */}
      <input
        id={`${id}-${charString}-4`}
        type="radio"
        name={charString}
        value="4"
        checked={char === '4'} // eslint-disable-line
        onChange={handleChange}
      />
      <label htmlFor={`${id}-${charString}-4`}>{description[3]}</label> {/* eslint-disable-line */}
      <input
        id={`${id}-${charString}-5`}
        type="radio"
        name={charString}
        value="5"
        checked={char === '5'} // eslint-disable-line
        onChange={handleChange}
      />
      <label htmlFor={`${id}-${charString}-5`}>{description[4]}</label> {/* eslint-disable-line */}
    </Wrapper>
  );
}

export default CharacteristicsRow;
