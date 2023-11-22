import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import QuestionsAndAnswers from './index.jsx'; // eslint-disable-line

describe('Questions and Answers', () => {
  it('exists', () => {
    render(<QuestionsAndAnswers />);
    expect(screen.getAllByText('QUESTIONS & ANSWERS').toBeTruthy);
  });
});
