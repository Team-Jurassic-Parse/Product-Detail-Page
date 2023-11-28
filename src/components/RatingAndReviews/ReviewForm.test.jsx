import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import {
  describe, test, expect, jest,
} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewForm from './ReviewForm'; // eslint-disable-line

jest.mock('axios');

describe('Test on Factors component', () => {
  test('it should render a overall rating filedset', () => {
    render(<ReviewForm productName="test" productId={40344} currentCharacteristics={{}} />);
    const overallRatingFiledset = screen.getByRole('group', { name: /overall rating/i });
    expect(overallRatingFiledset).toBeInTheDocument();
  });

  test('it should render a four text boxes', () => {
    render(<ReviewForm productName="test" productId={40344} currentCharacteristics={{}} />);
    const textBoxes = screen.getAllByRole('textbox');
    expect(textBoxes.length).toBe(4);
  });

  test('user should be submit the form', async () => {
    axios.post.mockResolvedValue({ data: 'response data' });
    render(<ReviewForm productName="test" productId={40344} currentCharacteristics={{}} />);
    fireEvent.change(screen.getByPlaceholderText('Review Summary. Up to 60 characters'), { target: { value: 'Great product!' } });
    fireEvent.change(screen.getByPlaceholderText('Review Body. Up to 1000 characters'), { target: { value: 'I really liked this product because...' } });
    fireEvent.change(screen.getByPlaceholderText('Your Nickname'), { target: { value: 'TestUser' } });
    fireEvent.change(screen.getByPlaceholderText('Your email: example@mail.com'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(axios.post).toHaveBeenCalled();
  });
});
