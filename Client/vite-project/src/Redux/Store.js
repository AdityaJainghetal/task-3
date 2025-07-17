import { configureStore } from '@reduxjs/toolkit';
import checkoutReducer from './checkoutSlice';
import authReducer from  "./authSlice";

export const store = configureStore({
  reducer: {
   
    checkout: checkoutReducer,
     auth: authReducer,
  },
});