import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import AnswerModal from '../AnswerModal.jsx'; // eslint-disable-line

describe('Answer Modal', () => {
  it('should render the Modal', () => {
    render(<AnswerModal
      productName="Oversized Jacket"
      questionBody="How big is the jacket?"
      questionId="646801"
    />);
    expect(screen.findByText('Oversized Jacket: How big is the jacket?').toBeTruthy);
  });

  it('should have 3 text input fields', () => {
    render(<AnswerModal
      productName="Oversized Jacket"
      questionBody="How big is the jacket?"
      questionId="646801"
    />);
    const inputBoxes = screen.getAllByRole('textbox');
    expect(inputBoxes.length).toBe(3);
  });

  it('should have 3 buttons: one to upload photos, one to submit the form, one to close the form', () => {
    render(<AnswerModal
      productName="Oversized Jacket"
      questionBody="How big is the jacket?"
      questionId="646801"
    />);
    const modalBtns = screen.getAllByRole('button');
    expect(modalBtns.length).toBe(3);
  });
});
