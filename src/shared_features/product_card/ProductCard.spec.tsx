import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { addToWishlist } from '../../store/wishliststore';

const mockPush = jest.fn()
const mockDispatch = jest.fn() as jest.Mock;
let selectorMock = { WishlistReducer: {items: []}}

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush       
  }),
}))

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(fn => fn(selectorMock))
}));

const defaultProps = {
    id: 1,
    category: "beauty",
    brand: "Essence",
    thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    discountPercentage: 10.48,
    rating: 2.56,
  };

describe('ProductCard', () => {

  beforeEach(() => {
    render(
      <ProductCard {...defaultProps}/>
    );
  })

  test('renders product card', () => {
    expect(screen.getByText("Essence Mascara Lash Princess")).toBeInTheDocument();
    expect(screen.getByText("beauty")).toBeInTheDocument();
    expect(screen.getByText("Essence")).toBeInTheDocument();
  });

  test("Router push happen on product card clicked", ()=> {
      const card = screen.getByTestId('product-card')
      fireEvent.click(card)
      expect(mockPush).toHaveBeenCalledWith('/item?product=1')
  })

  test('dispatch to add item to wishlist favorite icon clicked', () => {

    const favIcon = screen.getByRole('button')
    fireEvent.click(favIcon)

    selectorMock = { WishlistReducer: { items: []}}

    expect(mockDispatch).toHaveBeenCalledWith(
        addToWishlist({
        itemId: 1,
        title: "Essence Mascara Lash Princess",
        price: 9.99,
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
        discountPercentage: 10.48,
        rating: 2.56,
        brand: 'Essence',
      }),
    );
  })

  // test('dispatches removeFromWishlist when favorite icon clicked and item is already wishlisted', () => {
  //   selectorMock = {
  //     WishlistReducer: {
  //       items: [
  //         {
  //           itemId: 1,
  //           title: 'Essence Mascara Lash Princess',
  //           price: 9.99,
  //           thumbnail:'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
  //           discountPercentage: 10.48,
  //           rating: 2.56,
  //           brand: 'Essence',
  //         },
  //       ],
  //     },
  //   };

  //   render(<ProductCard {...defaultProps} />);
  //   const favIcon = screen.getByRole('button');
  //   fireEvent.click(favIcon);

  //   expect(mockDispatch).toHaveBeenCalledWith(
  //     removeFromWishlist(1)
  //   );
  // })

  // test('if iwsh')

});
