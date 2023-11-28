import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect, beforeEach,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Recomended from './Recomended.jsx'; // eslint-disable-line

describe('Recomended component test', () => {
  beforeEach(() => {
    render(<Recomended recommend="yes" setRecommend={() => {}} />);
  });

  test('show two radio buttons', () => {
    const radioBtns = screen.getAllByRole('radio');
    expect(radioBtns.length).toBe(2);
  });
});
