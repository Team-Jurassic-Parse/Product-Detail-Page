import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Question from '../Question.jsx'; // eslint-disable-line

describe('Question', () => {
  const mockQuestion = {
    question_id: 647166,
    question_body: 'What is this?',
    question_date: '2023-11-26T00:00:00.000Z',
    asker_name: 'nickname2',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  };

  it('should render the question', () => {
    render(<Question key="647166" questionId="647166" question={mockQuestion} />);
    expect(screen.findByText('Q:What is this?').toBeTruthy);
  });

  it('should render the AddAnswerBtn', () => {
    render(<Question key="647166" questionId="647166" question={mockQuestion} />);
    expect(screen.findByText('Add Answer').toBeTruthy);
  });
});
