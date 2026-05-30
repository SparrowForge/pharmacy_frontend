import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import shopReducer from "./features/shops/shopSlice";
import branchReducer from "./features/branch/branchSlice";
import enumReducer from "./features/enum/enumSlice";
import countryReducer from "./features/country/countrySlice";
import divisionReducer from "./features/division/divisionSlice";
import districtReducer from "./features/districts/districtSlice";
import thanaReducer from "./features/thanas/thanaSlice";
import regionReducer from "./features/region/regionSlice";
import zoneReducer from "./features/zone/zoneSlice";
import routerReducer from "./features/routes/routeSlice";
import lineReducer from "./features/lines/lineSlice";
import companyReducer from "./features/company/companySlice";
import productBrandReducer from "./features/product-brand/productBrandSlice";
import mediaFileReducer from "./features/media-files/mediaFileSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    shops: shopReducer,
    branch: branchReducer,
    enums: enumReducer,
    countries: countryReducer,
    divisions: divisionReducer,
    districts: districtReducer,
    thanas: thanaReducer,
    regions: regionReducer,
    zones: zoneReducer,
    routes: routerReducer,
    lines: lineReducer,
    companies: companyReducer,
    productBrand: productBrandReducer,
    mediaFiles: mediaFileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
