import React from 'react';
import styled from 'styled-components';

const RatingText = styled.span`
  display: inline-block;
  margin-bottom: 20px;
  background-color: #d1fae5;
  color: #065f46;
  font-size: 0.8rem;
  font-weight: 700;
  margin-right: 0.5rem;
  padding: 0.2rem 0.6rem;
  border-radius: 0.25rem;
`;

export default function RecommendTag() {
  return (
    <RatingText>👍 Recommended</RatingText>
  );
}
