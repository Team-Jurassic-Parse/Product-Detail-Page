import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RelatedProductsList from './RelatedProductsList';
import '@testing-library/jest-dom';
import { describe, expect, it, beforeEach, jest } from '@jest/globals';

const mockRelatedItems = {
  relatedItems: {
    1: {
      id: 1,
      category: 'Test Category',
      name: 'Test Product',
      default_price: '50.00',
      sale_price: '40.00',
      photos: [{ thumbnail_url: 'test_image_url' }],
    },
  },
};

const mockOnClickRelatedProduct = jest.fn();
const mockSetProductId = jest.fn();

describe('RelatedProductsList', () => {
  it('renders related items correctly', () => {
    render(
      <RelatedProductsList
        relatedItems={mockRelatedItems}
        onClickRelatedProduct={mockOnClickRelatedProduct}
        setProductId={mockSetProductId}
      />,
    );

    // Ensure that the related items are rendered
    const relatedItemElements = screen.getAllByRole('img', {
      name: /product thumbnail/i,
    });
    expect(relatedItemElements.length).toBe(
      Object.keys(mockRelatedItems.relatedItems).length,
    );

    // Simulate clicking on a related product
    userEvent.click(relatedItemElements[0]);

    // Ensure that the onClickRelatedProduct function is called with the correct arguments
    expect(mockOnClickRelatedProduct).toHaveBeenCalledWith(expect.any(Object));

    // Ensure that the setProductId function is called with the correct arguments
    expect(mockSetProductId).toHaveBeenCalledWith(expect.any(Number));
  });

  it('handles case when relatedItems is null', () => {
    render(<RelatedProductsList relatedItems={null} />);

    // Ensure that the "No related items available" message is rendered
    const noRelatedItemsMessage = screen.getByText(
      /no related items available/i,
    );
    expect(noRelatedItemsMessage).toBeInTheDocument();
  });
});
