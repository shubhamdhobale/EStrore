import { configureStore } from '@reduxjs/toolkit' 
import { cartSlice } from './CardSlice'

export const store = configureStore({
  reducer: {
    cart : cartSlice
  },
})