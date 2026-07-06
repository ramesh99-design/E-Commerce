import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Features/Cart/CartSlice";
import wishlistReducer from "./Features/Cart/WishListSlice";
import authReducer from "./Features/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});
