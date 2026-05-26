import { IEnumbState } from "@/src/types/enum.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IEnumbState = {
  loading: false,
  error: null,

  shopPlans: [],
  companyTypes: [],
};

const enumbSlice = createSlice({
  name: "enumb",

  initialState,

  reducers: {
    /* SHOP */
    getShopPlansStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getShopPlansSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.shopPlans = action.payload;
    },

    getShopPlansFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* COMPANY */
    getCompanyTypeStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getCompanyTypeSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.companyTypes = action.payload;
    },

    getCompanyTypeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearEnumbError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getShopPlansStart,
  getShopPlansSuccess,
  getShopPlansFailure,

  getCompanyTypeStart,
  getCompanyTypeSuccess,
  getCompanyTypeFailure,
  clearEnumbError,
} = enumbSlice.actions;

export default enumbSlice.reducer;
