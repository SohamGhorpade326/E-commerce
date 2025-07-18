import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productListReducer from './productsSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    productList: productListReducer,
    cart: cartReducer,
  },
});

export default store;