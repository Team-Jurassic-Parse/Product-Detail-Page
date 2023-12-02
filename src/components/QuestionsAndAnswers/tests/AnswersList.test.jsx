import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import AnswersList from '../AnswersList.jsx';

describe('Answers List', () => {
  const MockAnswers = [
    {
      answer_id: 5993309,
      body: 'Fits great!',
      date: '2023-11-23T00:00:00.000Z',
      answerer_name: 'user1',
      helpfulness: 4,
      photos: [],
    },
    {
      answer_id: 5993338,
      body: "it's me again",
      date: '2023-11-25T00:00:00.000Z',
      answerer_name: 'fasdfasfd',
      helpfulness: 1,
      photos: [],
    },
  ];

  it('should render the answers', () => {
    render(<AnswersList
      currentAnswers={MockAnswers}
      totalAnswers="2"
      handleSeeMoreAnswers={() => {}}
      isExpanded="false"
      handleCollapseAnswers={() => {}}
    />);
    expect(screen.findByText('Fits great!').toBeTruthy);
    expect(screen.findByText("it's me again").toBeTruthy);
  });

  it('should render the the SeeMoreAnswersBtn if there are more than 2 answers', () => {
    render(<AnswersList
      currentAnswers={MockAnswers}
      totalAnswers="3"
      handleSeeMoreAnswers={() => {}}
      isExpanded="false"
      handleCollapseAnswers={() => {}}
    />);
    expect(screen.getAllByRole('button').length).toBe(1);
  });
});
