import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "@/src/types/shop.types";

interface IShopState {
  shops: IShop[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleShop: IShop | null;
  singleShopLoading: boolean;
  singleShopError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IShopState = {
  shops: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleShop: null,
  singleShopLoading: false,
  singleShopError: null,

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
      }>,
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

    /* ================= GET SINGLE SHOP ================= */
    fetchSingleShopStart: (state) => {
      state.singleShopLoading = true;
      state.singleShopError = null;
    },

    fetchSingleShopSuccess: (state, action: PayloadAction<IShop>) => {
      state.singleShopLoading = false;
      state.singleShop = action.payload;
    },

    fetchSingleShopFailure: (state, action: PayloadAction<string>) => {
      state.singleShopLoading = false;
      state.singleShopError = action.payload;
    },

    /* ================= UPDATE SINGLE SHOP ================= */
    updateShopStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateShopSuccess: (state, action: PayloadAction<IShop>) => {
      state.updateLoading = false;

      const updatedShop = action.payload;

      state.shops = state.shops.map((shop) =>
        shop.id === updatedShop.id ? updatedShop : shop,
      );
    },

    updateShopFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE SINGLE SHOP ================= */
    deleteShopStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteShopSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      const deletedId = action.payload;
      state.shops = state.shops.filter((shop) => shop.id !== deletedId);
    },

    deleteShopFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
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

  fetchSingleShopStart,
  fetchSingleShopSuccess,
  fetchSingleShopFailure,

  updateShopStart,
  updateShopSuccess,
  updateShopFailure,

  deleteShopStart,
  deleteShopSuccess,
  deleteShopFailure,

  clearShopState,
} = shopSlice.actions;

export default shopSlice.reducer;
