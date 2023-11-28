import '@testing-library/jest-dom';
import React from 'react';
import {
  describe, test, expect, jest,
} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import UploadPhoto from './UploadPhoto.jsx'; // eslint-disable-line

describe('UploadPhoto component test', () => {
  test('upload btn should exist', () => {
    render(<UploadPhoto images={[]} handleImageChange={() => {}} />);
    const uploadBtn = screen.getByRole('button', { name: /upload photo/i });
    expect(uploadBtn).toBeInTheDocument();
  });

  test('clicking upload photo button triggers file upload', async () => {
    render(<UploadPhoto images={[]} handleImageChange={() => {}} />);
    const fileInput = screen.getByTestId('file-input');
    const uploadBtn = screen.getByRole('button', { name: /upload photo/i });

    fileInput.click = jest.fn();

    await fireEvent.click(uploadBtn);

    expect(fileInput.click).toHaveBeenCalled();
  });

  test('should show one thumnail when images has one element', () => {
    render(<UploadPhoto images={['test.png']} handleImageChange={() => {}} />);
    const thumnail = screen.getByRole('img');
    expect(thumnail).toBeInTheDocument();
  });

  test('file input change triggers handleImageChange function', async () => {
    const mockHandleImageChange = jest.fn();
    global.URL.createObjectURL = jest.fn(() => 'blob:test-url');
    render(<UploadPhoto images={[]} handleImageChange={mockHandleImageChange} />);
    const mockFile = new File([':)'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('file-input');
    await fireEvent.change(fileInput, { target: { files: [mockFile] } });
    expect(mockHandleImageChange).toHaveBeenCalledWith(['blob:test-url']);
  });
});
