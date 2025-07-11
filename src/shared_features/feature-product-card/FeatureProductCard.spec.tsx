import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FeatureProductCard from './FeatureProductCard';
import axios from 'axios';
import '@testing-library/jest-dom';
import { Product } from './FeatureProductCard';
import { ProductDetailsType } from '@/app/item/page';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../product_card/ProductCard', () => {
    const mockProductCard =  (props: ProductDetailsType) => (
        <div data-testid="product-card">{props.title}</div>
    )
    mockProductCard.displayName = 'MockProductCard'
    return mockProductCard
});

jest.mock('../skeleton/SkeletonCard', () => {
    const mockSkeleton =  () => (
        <div data-testid="skeleton-card">Loading...</div>
    )
    mockSkeleton.displayName = 'MockSkeleton'
    return mockSkeleton
})

const mockProducts: Product[] = [
  {
    id: 1,
    category: 'electronics',
    brand: 'Apple',
    thumbnail: 'image.jpg',
    title: 'iPhone',
    price: 999,
    discountPercentage: 10,
    rating: 4.5,
  },
  {
    id: 2,
    category: 'electronics',
    brand: 'Samsung',
    thumbnail: 'image2.jpg',
    title: 'Galaxy',
    price: 799,
    discountPercentage: 5,
    rating: 4.3,
  },
];

describe('FeatureProductCard', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: {
        products: mockProducts,
      },
    });
  });

  it('displays loading skeletons initially', async () => {
    render(<FeatureProductCard head="Featured Products" type="new" />);
    
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(4);
    
    // Wait for product cards to be rendered
    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(mockProducts.length);
    });
  });

  it('renders product cards with correct data', async () => {
    render(<FeatureProductCard head="Top Products" type="top" />);
    
    await waitFor(() => {
      expect(screen.getByText('iPhone')).toBeInTheDocument();
      expect(screen.getByText('Galaxy')).toBeInTheDocument();
    });
  });

  it('renders product cards with wrong data - catch section', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"))
    render(<FeatureProductCard head="Top Products" type="top" />);
    await waitFor(() => {
        expect(screen.getAllByTestId('skeleton-card')).toHaveLength(4);
    });
  });

  it('displays header text', async () => {
    render(<FeatureProductCard head="Bestsellers" type="top" />);
    expect(screen.getByText('Bestsellers')).toBeInTheDocument();
  });
});
