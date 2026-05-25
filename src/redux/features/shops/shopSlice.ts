import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "@/src/types/shop.types";

interface IShopState {
  shops: IShop[];

  fetchLoading: boolean;
  createLoading: boolean;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IShopState = {
  shops: [],

  fetchLoading: false,
  createLoading: false,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    /* ================= FETCH SHOPS ================= */

    fetchShopsStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchShopsSuccess: (
      state,
      action: PayloadAction<{
        data: IShop[];
        page: number;
        limit: number;
        total: number;
      }>
    ) => {
      state.fetchLoading = false;

      state.shops = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchShopsFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE SHOP ================= */

    createShopStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createShopSuccess: (state, action: PayloadAction<IShop>) => {
      state.createLoading = false;

      // add new shop on top (NO REFRESH NEEDED)
      state.shops.unshift(action.payload);

      state.total += 1;
    },

    createShopFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearShopState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchShopsStart,
  fetchShopsSuccess,
  fetchShopsFailure,

  createShopStart,
  createShopSuccess,
  createShopFailure,

  clearShopState,
} = shopSlice.actions;

export default shopSlice.reducer;