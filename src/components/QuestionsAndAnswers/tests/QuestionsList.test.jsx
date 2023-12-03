import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import QuestionsList from '../QuestionsList.jsx';

describe('Questions List', () => {
  const mockQuestions = [
    {
      "question_id": 647166,
      "question_body": "What is this?",
      "question_date": "2023-11-26T00:00:00.000Z",
      "asker_name": "nickname2",
      "question_helpfulness": 0,
      "reported": false,
      "answers": {}
    },
  ];

  it('should render the question', () => {
    render(<QuestionsList query='' currentQuestions={mockQuestions} />);
    expect(screen.findByText('Q:What is this?').toBeTruthy);
  });

  it('should render the AddAnswerBtn', () => {
    render(<QuestionsList query='' currentQuestions={mockQuestions} />);
    expect(screen.findByText('Add Answer').toBeTruthy);
    expect(screen.getAllByRole('button').length).toBe(1);
  });
});
