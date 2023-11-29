/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, beforeEach } from '@jest/globals';
import { act } from 'react-dom/test-utils';
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

jest.mock('../../hooks/useServerFetch.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RelatedProducts Component', () => {
  const mockUseServerFetch = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    mockUseServerFetch.mockImplementation(() => Promise.resolve({ data: [] }));
  });

  test('renders Related Products and Your Outfit sections', async () => {
    const productId = 40346;
    const setProductId = jest.fn();
    const styleId = 456;
    const productReview = { ratings: {} };
    const productInfo = {};
    const productStyles = { results: [] };

    await act(async () => {
      render(
        <RelatedProducts
          productId={productId}
          setProductId={setProductId}
          styleId={styleId}
          productReview={productReview}
          productInfo={productInfo}
          productStyles={productStyles}
        />
      );
    });
    expect(screen.getByText('Related Products')).toBeInTheDocument();
    expect(screen.getByText('Your Outfit')).toBeInTheDocument();
  });
});

test('renders OutfitList component with outfits and handles interactions', () => {
  const outfits = {
    40344: {
      id: 40344,
      campus: 'hr-rfp',
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description:
        'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140.00',
      created_at: '2021-08-13T14:38:44.509Z',
      updated_at: '2021-08-13T14:38:44.509Z',
      features: [
        {
          feature: 'Fabric',
          value: 'Canvas',
        },
        {
          feature: 'Buttons',
          value: 'Brass',
        },
      ],
      photos: [
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        },
      ],
      sale_price: '100.00',
      original_price: '140.00',
      avg_ratings: 3.733879781420765,
    },
    40347: {
      id: 40347,
      campus: 'hr-rfp',
      name: "Slacker's Slacks",
      slogan: 'Comfortable for everything, or nothing',
      description: "I'll tell you how great they are after I nap for a bit.",
      category: 'Pants',
      default_price: '65.00',
      created_at: '2021-08-13T14:38:44.509Z',
      updated_at: '2021-08-13T14:38:44.509Z',
      features: [
        {
          feature: 'Fabric',
          value: '99% Cotton 1% Elastic',
        },
        {
          feature: 'Cut',
          value: 'Loose',
        },
      ],
      photos: [
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1519722417352-7d6959729417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1519722417352-7d6959729417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1554774853-d50f9c681ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1554774853-d50f9c681ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
        },
      ],
      sale_price: null,
      original_price: '65.00',
      avg_ratings: 3.2447552447552446,
    },
    40350: {
      id: 40350,
      campus: 'hr-rfp',
      name: 'Blues Suede Shoes',
      slogan: '2019 Stanley Cup Limited Edition',
      description:
        'Touch down in the land of the Delta Blues in the middle of the pouring rain',
      category: 'Dress Shoes',
      default_price: '120.00',
      created_at: '2021-08-13T14:38:44.509Z',
      updated_at: '2021-08-13T14:38:44.509Z',
      features: [
        {
          feature: 'Sole',
          value: 'Rubber',
        },
        {
          feature: 'Material',
          value: 'FullControlSkin',
        },
        {
          feature: 'Stitching',
          value: 'Double Stitch',
        },
      ],
      photos: [
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        },
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        },
      ],
      sale_price: null,
      original_price: '120.00',
      avg_ratings: 3.925619834710744,
    },
  };

  const onClickAddOutfits = jest.fn();
  const removeItem = jest.fn();
  const onClickRelatedProduct = jest.fn();

  const { getByTestId } = render(
    <OutfitList
      outfits={outfits}
      onClickAddOutfits={onClickAddOutfits}
      removeItem={removeItem}
      onClickRelatedProduct={onClickRelatedProduct}
    />
  );

  const addButton = getByTestId('add-outfit-button');
  expect(addButton).toBeInTheDocument();

  fireEvent.click(addButton);
  expect(onClickAddOutfits).toHaveBeenCalled();
});

jest.mock('../../hooks/useServerFetch');
