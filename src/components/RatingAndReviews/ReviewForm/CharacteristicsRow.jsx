import React, { useId } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  padding: 8px 12px;
  span {
    flex-shrink: 0;
    text-transform: capitalize;
    font-weight: bold;
    padding-right: 16px;
  }
`;

const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
  padding-left: 6px;
  padding-right: 6px;
  @media (min-width: 640px) {
    border-right: 1px solid #e5e7eb;
    border-bottom: none;
  }
  &:last-child {
    border-right: none;
  }

`;

function CharacteristicsRow({ char, handleChange, charString, description }) { // eslint-disable-line
  const id = useId();
  return (
    <Wrapper>
      <span>{charString}</span>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-1`}
          type="radio"
          name={charString}
          value="1"
        checked={char === '1'} // eslint-disable-line
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-1`}>{description[0]}</label> {/* eslint-disable-line */}
      </GroupWrapper>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-2`}
          type="radio"
          name={charString}
          value="2"
        checked={char === '2'} // eslint-disable-line
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-2`}>{description[1]}</label> {/* eslint-disable-line */}
      </GroupWrapper>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-3`}
          type="radio"
          name={charString}
          value="3"
        checked={char === '3'} // eslint-disable-line
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-3`}>{description[2]}</label> {/* eslint-disable-line */}
      </GroupWrapper>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-4`}
          type="radio"
          name={charString}
          value="4"
        checked={char === '4'} // eslint-disable-line
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-4`}>{description[3]}</label> {/* eslint-disable-line */}
      </GroupWrapper>
      <GroupWrapper>
        <input
          id={`${id}-${charString}-5`}
          type="radio"
          name={charString}
          value="5"
        checked={char === '5'} // eslint-disable-line
          onChange={handleChange}
        />
      <label htmlFor={`${id}-${charString}-5`}>{description[4]}</label> {/* eslint-disable-line */}
      </GroupWrapper>
    </Wrapper>
  );
}

export default CharacteristicsRow;
