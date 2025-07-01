import authReducer from '../store/AuthSlice'
import cartReducer from '../store/cartslice'
import WishlistReducer from '../store/wishliststore'

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        cartReducer: cartReducer,
        WishlistReducer: WishlistReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch