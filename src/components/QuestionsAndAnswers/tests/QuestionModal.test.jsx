import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import QuestionModal from '../QuestionModal.jsx'; // eslint-disable-line

describe('Question Modal', () => {
  it('should render the Modal', () => {
    render(<QuestionModal productName="Dummy product name" productId="40344" />);
    expect(screen.findByText('Dummy product name').toBeTruthy);
  });

  it('should have 3 text input fields', () => {
    render(<QuestionModal productName="placeholder" productId="40344" />);
    const inputBoxes = screen.getAllByRole('textbox');
    expect(inputBoxes.length).toBe(3);
  });

  it('should have 3 buttons: one to upload photos, one to submit the form, one to close the form', () => {
    render(<QuestionModal productName="placeholder" productId="40344" />);
    const modalBtns = screen.getAllByRole('button');
    expect(modalBtns.length).toBe(1);
  });
});
