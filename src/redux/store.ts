import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import shopReducer from "./features/shops/shopSlice";
import branchReducer from "./features/branch/branchSlice";
import enumReducer from "./features/enum/enumSlice";
import countryReducer from "./features/country/countrySlice";
import divisionReducer from "./features/division/divisionSlice";
import districtReducer from "./features/districts/districtSlice";
import thanaReducer from "./features/thanas/thanaSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    shops: shopReducer,
    branch: branchReducer,
    enums: enumReducer,
    countries: countryReducer,
    divisions: divisionReducer,
    districts: districtReducer,
    thanas:thanaReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
