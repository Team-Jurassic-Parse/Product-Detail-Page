import '@testing-library/jest-dom';
import { test, expect, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Star from './Star.jsx'; // eslint-disable-line

describe('Start should show different star icon with correct aria label based on fill proerty', () => {
  test('it should show an empty star div by default', () => {
    render(<Star />);
    expect(screen.getByLabelText('Empty star')).toBeInTheDocument();
  });

  test('it should show an empty star when fill <= 0.1', () => {
    render(<Star fill={0} />);
    expect(screen.getByLabelText('Empty star')).toBeInTheDocument();
  });

  test('it should show 1 Quarter star', () => {
    render(<Star fill={0.2} />);
    expect(screen.getByLabelText('Quarter star')).toBeInTheDocument();
  });

  test('it should show half star', () => {
    render(<Star fill={0.5} />);
    expect(screen.getByLabelText('Half star')).toBeInTheDocument();
  });

  test('it should show three quarters star', () => {
    render(<Star fill={0.8} />);
    expect(screen.getByLabelText('Three quarters star')).toBeInTheDocument();
  });

  test('it should show full star', () => {
    render(<Star fill={0.95} />);
    expect(screen.getByLabelText('Full star')).toBeInTheDocument();
  });
});
