import { IEnumbState } from "@/src/types/enum.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: IEnumbState = {
  loading: false,
  error: null,

  shopPlans: [],
};

const enumbSlice = createSlice({
  name: "enumb",

  initialState,

  reducers: {
    getShopPlansStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getShopPlansSuccess: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.loading = false;
      state.shopPlans = action.payload;
    },

    getShopPlansFailure: (
      state,
      action: PayloadAction<string>
    ) => {
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
  clearEnumbError,
} = enumbSlice.actions;

export default enumbSlice.reducer;