import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect, jest, beforeEach,
} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewCardHelpfulness from './ReviewCardHelpfulness'; // eslint-disable-line
import useServerFetch from '../../../hooks/useServerFetch.js'; // eslint-disable-line

jest.mock('../../../hooks/useServerFetch.js');

describe('Test on FactorSlider component', () => {
  beforeEach(() => {
    useServerFetch.mockClear();
  });
  test('it should render the helpfulness btn', () => {
    render(<ReviewCardHelpfulness reviewId="1" helpfulness={1} />);
    const helpfulText = screen.getByText(/helpful\?/i);
    expect(helpfulText).toBeInTheDocument();
  });

  test('click yes button will disable buttons and handle error', () => {
    useServerFetch.mockImplementation(() => Promise.reject(new Error('Network error')));
    render(<ReviewCardHelpfulness reviewId="1" helpfulness={1} />);
    const yesButton = screen.getByText('Yes');
    fireEvent.click(yesButton);
    expect(yesButton).toBeDisabled();
  });

  test('click yes button will disable buttons and handle success', () => {
    useServerFetch.mockImplementation(() => Promise.resolve({ message: 'success' }));
    render(<ReviewCardHelpfulness reviewId="1" helpfulness={1} />);
    const yesButton = screen.getByText('Yes');
    fireEvent.click(yesButton);
    expect(yesButton).toBeDisabled();
  });
});
