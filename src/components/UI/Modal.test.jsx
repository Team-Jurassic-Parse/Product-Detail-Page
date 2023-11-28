import '@testing-library/jest-dom';
import {
  test, expect, describe, jest,
} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Modal from './Modal.jsx';

describe('Modal component test', () => {
  test('it should render', () => {
    render(<Modal handleClose={() => {}} />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

  test('it should render children', () => {
    render(<Modal handleClose={() => {}}>Hello</Modal>);
    const content = screen.getByRole('button', { name: /hello/i });
    expect(content).toBeInTheDocument();
  });

  test('it should be clickable', () => {
    const mock = jest.fn();
    render(<Modal handleClose={mock}>Hello</Modal>);
    const modalBackground = screen.getByRole('button', { name: /hello/i });
    fireEvent.click(modalBackground);
    expect(mock).toBeCalled();
  });
});
