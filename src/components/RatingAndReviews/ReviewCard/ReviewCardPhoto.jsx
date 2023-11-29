/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

export default function ReviewCardPhoto({ photo }) {
  return (
    <Wrapper>{JSON.stringify(photo)}</Wrapper>
  );
}
