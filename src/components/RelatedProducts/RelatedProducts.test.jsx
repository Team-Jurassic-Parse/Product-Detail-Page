/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, beforeEach } from '@jest/globals';
import RelatedProducts from './index.jsx';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import ComparisonTable from './ComparisonTable.jsx';
import useServerFetch from '../../hooks/useServerFetch.js';

jest.mock('../../hooks/useServerFetch');

describe('RelatedProducts', () => {
  const mockProductId = 1;
  const mockSetProductId = jest.fn();
  const mockStyleId = 1;
  const mockProductReview = { ratings: [] };
  const mockProductInfo = { id: 1, category: 'Test', name: 'Test Product' };
  const mockProductStyles = { results: [] };

  beforeEach(() => {
    useServerFetch.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <RelatedProducts
        productId={mockProductId}
        setProductId={mockSetProductId}
        styleId={mockStyleId}
        productReview={mockProductReview}
        productInfo={mockProductInfo}
        productStyles={mockProductStyles}
      />
    );
  });

  it('fetches related products and renders RelatedProductsList', async () => {
    useServerFetch
      .mockResolvedValueOnce({ data: [2, 3, 4] })
      .mockResolvedValueOnce({
        data: { 2: { id: 2, category: 'Test', name: 'Related 2' } },
      })
      .mockResolvedValueOnce({ data: { results: [] } });

    render(
      <RelatedProducts
        productId={mockProductId}
        setProductId={mockSetProductId}
        styleId={mockStyleId}
        productReview={mockProductReview}
        productInfo={mockProductInfo}
        productStyles={mockProductStyles}
      />
    );
  });

  describe('RelatedProductsList', () => {
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

    it('renders without crashing', () => {
      render(
        <RelatedProductsList
          relatedItems={mockRelatedItems}
          onClickRelatedProduct={jest.fn()}
          setCurrentIdAndUpdateModal={jest.fn()}
        />
      );
    });
  });

  describe('OutfitList', () => {
    const mockOutfits = {
      1: {
        id: 1,
        category: 'Test Category',
        name: 'Test Product',
        default_price: '50.00',
        sale_price: '40.00',
        photos: [{ thumbnail_url: 'test_image_url' }],
        avg_ratings: 4.5,
      },
    };

    const mockRemoveItem = jest.fn();
    const mockOnClickRelatedProduct = jest.fn();
    const mockOnClickAddOutfits = jest.fn();

    beforeEach(() => {
      mockRemoveItem.mockClear();
      mockOnClickRelatedProduct.mockClear();
      mockOnClickAddOutfits.mockClear();
    });

    it('renders without crashing', () => {
      render(
        <OutfitList
          outfits={mockOutfits}
          onClickAddOutfits={mockOnClickAddOutfits}
          removeItem={mockRemoveItem}
          onClickRelatedProduct={mockOnClickRelatedProduct}
          productReview={{ ratings: [] }}
        />
      );
    });
  });

  describe('ComparisonTable', () => {
    const mockCurrentProduct = {
      id: 1,
      name: 'Test Product',
      default_price: '50.00',
      category: 'Test Category',
      features: [
        { feature: 'Feature 1', value: 'Value 1' },
        { feature: 'Feature 2', value: 'Value 2' },
      ],
    };
    const mockComparedProduct = {
      id: 2,
      name: 'Compared Product',
      default_price: '60.00',
      category: 'Compared Category',
      features: [
        { feature: 'Feature 1', value: 'Value 1' },
        { feature: 'Feature 2', value: 'Value 3' },
      ],
    };

    it('renders without crashing', () => {
      render(
        <ComparisonTable
          currentProduct={mockCurrentProduct}
          comparedProduct={mockComparedProduct}
        />
      );
    });
  });
});

describe('OutfitList', () => {
  const mockOutfits = {
    1: {
      id: 1,
      category: 'Test Category',
      name: 'Test Product',
      default_price: '50.00',
      sale_price: '40.00',
      photos: [{ thumbnail_url: 'test_image_url' }],
      avg_ratings: 4.5,
    },
  };

  const mockRemoveItem = jest.fn();
  const mockOnClickRelatedProduct = jest.fn();
  const mockOnClickAddOutfits = jest.fn();

  beforeEach(() => {
    mockRemoveItem.mockClear();
    mockOnClickRelatedProduct.mockClear();
    mockOnClickAddOutfits.mockClear();
  });

  it('renders exactly one AddOutfitButton', () => {
    render(
      <OutfitList
        outfits={mockOutfits}
        onClickAddOutfits={() => {}}
        removeItem={() => {}}
        onClickRelatedProduct={() => {}}
        productReview={{ ratings: [] }}
      />
    );
    const addOutfitButtons = screen.getAllByTestId('add-outfit-button');

    expect(addOutfitButtons).toHaveLength(1);
  });

  it('calls onClickAddOutfits when AddOutfitButton is clicked', () => {
    render(
      <OutfitList
        outfits={mockOutfits}
        onClickAddOutfits={mockOnClickAddOutfits}
        removeItem={() => {}}
        onClickRelatedProduct={() => {}}
        productReview={{ ratings: [] }}
      />
    );

    const addOutfitButton = screen.getByTestId('add-outfit-button');
    fireEvent.click(addOutfitButton);

    expect(mockOnClickAddOutfits).toHaveBeenCalled();
  });
});

jest.mock('react-multi-carousel/lib/styles.css', () => ({}));

describe('OutfitList', () => {
  const mockOutfits = {
    1: {
      id: 1,
      category: 'Test Category',
      name: 'Test Product',
      default_price: '50.00',
      sale_price: '40.00',
      photos: [{ url: 'test_image_url' }],
      avg_ratings: 4.5,
    },
  };

  const mockRemoveItem = jest.fn();
  const mockOnClickAddOutfits = jest.fn();
  const mockOnClickRelatedProduct = jest.fn();

  beforeEach(() => {
    mockRemoveItem.mockClear();
    mockOnClickAddOutfits.mockClear();
    mockOnClickRelatedProduct.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <OutfitList
        outfits={mockOutfits}
        onClickAddOutfits={mockOnClickAddOutfits}
        removeItem={mockRemoveItem}
        onClickRelatedProduct={mockOnClickRelatedProduct}
      />
    );
  });

  it('calls onClickAddOutfits when AddOutfitButton is clicked', () => {
    render(
      <OutfitList
        outfits={mockOutfits}
        onClickAddOutfits={mockOnClickAddOutfits}
        removeItem={mockRemoveItem}
        onClickRelatedProduct={mockOnClickRelatedProduct}
      />
    );

    const addOutfitButton = screen.getByTestId('add-outfit-button');
    fireEvent.click(addOutfitButton);

    expect(mockOnClickAddOutfits).toHaveBeenCalled();
  });
});
