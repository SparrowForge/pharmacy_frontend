import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import shopReducer from "./features/shops/shopSlice";
import branchReducer from "./features/branch/branchSlice";
import enumReducer from "./features/enum/enumSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    shops: shopReducer,
    branch: branchReducer,
    enums: enumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
