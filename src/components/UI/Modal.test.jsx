import React from 'react';
import {
  describe,
  expect,
  it,
  beforeEach,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Modal from './Modal.jsx'; // eslint-disable-line

describe('Modal', () => {
  beforeEach(() => {
    render(
      <Modal>
        <div>
          Hello
        </div>
      </Modal>,
    );
  });
  it('renders', () => {
    console.log(screen.getAllByText('Hello'));
    expect(screen.getAllByText('Hello')).toBeTruthy();
  });
});
