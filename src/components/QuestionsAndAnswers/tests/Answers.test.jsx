import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Answers from '../Answers.jsx';

describe('Answers', () => {
  const MockAnswer = {
    answer_id: 5993309,
    body: 'Fits great!',
    date: '2023-11-23T00:00:00.000Z',
    answerer_name: 'user1',
    helpfulness: 4,
    photos: [],
  };

  it('should render the answer', () => {
    render(<Answers key={MockAnswer.answer_id} answer={MockAnswer} />);
    expect(screen.findByText('A: Fits great!').toBeTruthy);
  });

  it('should render the username, data, helpful rating and report', () => {
    render(<Answers key={MockAnswer.answer_id} answer={MockAnswer} />);
    expect(screen.findByText('by: user1, November 23, 2023 | Helpful? Yes(4) | Report').toBeTruthy);
  });
});
