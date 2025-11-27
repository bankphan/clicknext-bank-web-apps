import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import bankReducer from './bankSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        bank: bankReducer,
    },
});