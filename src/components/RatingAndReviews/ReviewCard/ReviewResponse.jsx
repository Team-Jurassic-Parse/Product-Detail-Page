/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

export default function ReviewResponse({ response }) {
  return (
    <Wrapper>{response}</Wrapper>
  );
}