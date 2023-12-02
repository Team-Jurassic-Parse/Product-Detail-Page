import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 12px;
  border-color: black;
  border-width: 2px;
  border-style: solid;
  overflow: hidden;
  padding: 4px;

  img {
    width: 120px;
    height: 100px;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const checkValidUrl = (url) => url.toLowerCase().startsWith('http');

export default function ReviewCardPhoto({ photo }) {
  if (!photo.url || !checkValidUrl(photo.url)) return null;
  return (
    <Wrapper>
      <img src={photo.url} alt="User Review" />
    </Wrapper>
  );
}
