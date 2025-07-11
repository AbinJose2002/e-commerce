import { render, screen, fireEvent } from '@testing-library/react';
import HomeBanner from './HomeBanner';
import '@testing-library/jest-dom';
import React from 'react';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('HomeBanner Component', () => {
  const props = {
    head: 'Welcome to ZeroPixels',
    para: 'Discover top-quality international products',
  };

  beforeEach(() => {
    render(<HomeBanner {...props} />);
  });

  it('renders heading and paragraph from props', () => {
    expect(screen.getByText(props.head)).toBeInTheDocument();
    expect(screen.getByText(props.para)).toBeInTheDocument();
  });

  it('renders the Shop Now button and triggers navigation', () => {
    const button = screen.getByRole('button', { name: /shop now/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/products');
  });

  it('renders stats section correctly', () => {
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText(/international brands/i)).toBeInTheDocument();

    expect(screen.getByText('2,000+')).toBeInTheDocument();
    expect(screen.getByText(/high quality products/i)).toBeInTheDocument();

    expect(screen.getByText('30,000+')).toBeInTheDocument();
    expect(screen.getByText(/happy customers/i)).toBeInTheDocument();
  });
});
