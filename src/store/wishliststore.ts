import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WishlistItem = {
  itemId: number;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage: number
  rating: number
 brand: string
};

export type WishlistState = {
  items: WishlistItem[];
};

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find(item => item.itemId === action.payload.itemId);
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.itemId !== action.payload);
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
