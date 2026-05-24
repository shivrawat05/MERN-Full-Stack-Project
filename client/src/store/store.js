import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsReducer from "./admin/products-slice";
import shoppingProductSliceReducer from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shoppingProductSliceReducer,
    shopCart: shopCartSlice,
  },
});

export default store;
