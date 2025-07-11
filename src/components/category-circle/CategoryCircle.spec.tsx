import React from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CategoryCircle from './CategoryCircle';
import axios from 'axios';

const mockPush = jest.fn()
jest.mock('axios')

jest.mock('next/navigation', ()=>({
    useRouter: ()=>({
        push: mockPush
    })
}))

beforeAll(()=>{
  render(<CategoryCircle />);
  screen.debug(undefined, Infinity)
})

describe('CategoryCircle component', () => {
  const mockCategories = [
    {
      slug: 'beauty',
      name: 'Beauty',
      url: 'https://dummyjson.com/products/category/beauty',
    },
  ];


  test('renders category title correctly', () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });
    render(<CategoryCircle />);
    // expect(screen.getAllByTitle('category-title')).toHaveLength(2);
    expect(screen.getAllByText('Shop by Category')).toHaveLength(2);
  });

  it('fetches and renders categories from API', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockCategories });
    render(<CategoryCircle />);
    expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products/categories');
    await waitFor(() => {
      expect(screen.getByText(/beauty/i)).toBeInTheDocument();
    });
  });

  test('router push works on category click', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockCategories });
    render(<CategoryCircle />);
    const avatar = await screen.findByTestId('beauty');
    fireEvent.click(avatar);
    expect(mockPush).toHaveBeenCalledWith('/products?category=beauty');
  });
});
