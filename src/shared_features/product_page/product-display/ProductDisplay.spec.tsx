// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import ProductDisplay from "./ProductDisplay";
// import React from "react";
// import { addToCart } from "../../../store/cartslice";

// const mockPush = jest.fn();
// const mockDispatch = jest.fn()

// jest.mock("next/navigation", () => ({
//   useRouter: () => ({
//     push: mockPush,
//   }),
// }));

// jest.mock('react-redux', () => ({
//   useDispatch: () => mockDispatch
// }))

// const defaultFormValues = {
//   id: 1,
//   title: "Essence Mascara Lash Princess",
//   description:
//     "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//   rating: 2.56,
//   price: 9.99,
//   discountPercentage: 10.48,
//   thumbnail:
//     "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
//   images: [
//     "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
//     "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/2.webp",
//   ],
//   availabilityStatus: "In Stock",
// };

// describe("ProductDisplay Component", () => {
//   beforeEach(() => {
//     render(<ProductDisplay prodDis={defaultFormValues} />);
//   });

//   it("renders product details correctly", () => {
//     expect(screen.getAllByText(/Essence Mascara Lash Princess/i)).toHaveLength(2);
//     expect(screen.getByText(/The Essence Mascara Lash Princess is a popular mascara/i)).toBeInTheDocument();
//     expect(screen.getByText(/₹764.81/i)).toBeInTheDocument(); // discounted price
//     expect(screen.getByText(/₹854.34/i)).toBeInTheDocument(); // original price
//     expect(screen.getByText(/\(10.48% off\)/i)).toBeInTheDocument();
//     expect(screen.getByText(/\(2.56 \/ 5\)/)).toBeInTheDocument();
//   });

//   it("renders product details not correctly", () => {
//     expect(screen.getAllByText(/Essence Mascara Lash Princess/i)).toHaveLength(0);
//     expect(screen.getByText(/The Essence Mascara Lash Princess is a popular mascara/i)).not.toBeInTheDocument();
//     expect(screen.getByText(/₹764.81/i)).not.toBeInTheDocument(); // discounted price
//     expect(screen.getByText(/₹854.34/i)).not.toBeInTheDocument(); // original price
//     expect(screen.getByText(/\(10.48% off\)/i)).not.toBeInTheDocument();
//     expect(screen.getByText(/\(2.56 \/ 5\)/)).not.toBeInTheDocument();
//   });

//   it("renders all image thumbnails", () => {
//     const thumbnails = screen.getAllByAltText("prod-icon");
//     expect(thumbnails.length).toBe(defaultFormValues.images.length);
//   });

//   it("updates selected image on thumbnail click", () => {
//   const thumbnails = screen.getAllByAltText("prod-icon");
//   fireEvent.click(thumbnails[1]);

//   const selectedImg = screen.getByAltText("selected") as HTMLImageElement;

//   // Check the original image URL is somewhere in the transformed src
//   expect(selectedImg.src).toContain(encodeURIComponent(defaultFormValues.images[1]));
// });


//   it("renders Buy Now and Add to Cart buttons", () => {
//     expect(screen.getByRole("button", { name: /Buy Now/i })).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
//   });

//   it("Buy Now button redirects to checkout", async () => {
//     const buyBtn = screen.getByRole("button", { name: /Buy Now/i });
//     fireEvent.click(buyBtn);
//     await waitFor(() => {
//       expect(mockPush).toHaveBeenCalledWith("/checkout?id=1");
//     });
//   });
  
//   it('Add to cart button adds to cart', async () => {
//     const cartBtn = screen.getByRole("button", { name: /Add to Cart/i });
//     fireEvent.click(cartBtn);
//     await waitFor(() => {
//     expect(mockDispatch).toHaveBeenCalledWith(
//       addToCart({
//         itemId: 0,
//         title: '',
//         price: 0,
//         thumbnail:
//           '',
//         count: 1,
//         discountPercentage: 0,
//       })
//     );
//   });
//   })

//   // it('does not dispatch addToCart when prodDis is undefined', async () => {
//   //   const cartBtn = screen.getByRole("button", { name: /Add to Cart/i });
//   //   fireEvent.click(cartBtn);
//   //   await waitFor(() => {
//   //   expect(mockDispatch).not.toHaveBeenCalled()
//   // });
//   // })
// });
