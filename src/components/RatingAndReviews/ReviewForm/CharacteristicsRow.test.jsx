import '@testing-library/jest-dom';
import {
  test, expect, describe,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import CharacteristicsRow from './CharacteristicsRow.jsx'; // eslint-disable-line

describe('CharacteristicsRow component test', () => {
  test('it should render', () => {
    const mockDescription = [
      'A size too small',
      'half a size too small',
      'Perfect',
      'Half a size too big',
      'A size too big',
    ];
    render(<CharacteristicsRow char="1" handleChange={() => {}} charString="size" description={mockDescription} />);
    const sizeText = screen.getAllByRole('radio');
    expect(sizeText.length).toBe(5);
  });
});
