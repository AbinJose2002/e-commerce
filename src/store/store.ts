import authReducer from '../store/AuthSlice'

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        authReducer: authReducer,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch