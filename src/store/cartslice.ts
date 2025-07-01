import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  itemId: number;
  title: string;
  price: number;
  thumbnail: string;
  count: number;
  discountPercentage: number | ''
};

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<CartItem>
    ) => {
      const existing = state.items.find(item => item.itemId === action.payload.itemId);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      return 
    },

    increaseCount: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.itemId === action.payload);
      if (item) item.count += 1;
    },

    decreaseCount: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.itemId === action.payload);
      if (item && item.count > 1) item.count -= 1;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.itemId !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increaseCount, decreaseCount, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
