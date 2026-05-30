import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductBrand } from "@/src/types/productBrand.types";

interface IProductBrandState {
  brands: IProductBrand[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleBrand: IProductBrand | null;
  singleBrandLoading: boolean;
  singleBrandError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IProductBrandState = {
  brands: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleBrand: null,
  singleBrandLoading: false,
  singleBrandError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const productBrandSlice = createSlice({
  name: "productBrand",
  initialState,
  reducers: {
    /* FETCH ALL */
    fetchBrandsStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchBrandsSuccess: (
      state,
      action: PayloadAction<{
        data: IProductBrand[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;
      state.brands = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchBrandsFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* CREATE */
    createBrandStart: (state) => {
      state.createLoading = true;
    },

    createBrandSuccess: (state, action: PayloadAction<IProductBrand>) => {
      state.createLoading = false;
      state.brands.unshift(action.payload);
      state.total += 1;
    },

    createBrandFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* SINGLE */
    fetchSingleBrandStart: (state) => {
      state.singleBrandLoading = true;
      state.singleBrandError = null;
    },

    fetchSingleBrandSuccess: (
      state,
      action: PayloadAction<IProductBrand>,
    ) => {
      state.singleBrandLoading = false;
      state.singleBrand = action.payload;
    },

    fetchSingleBrandFailure: (state, action: PayloadAction<string>) => {
      state.singleBrandLoading = false;
      state.singleBrandError = action.payload;
    },

    /* UPDATE */
    updateBrandStart: (state) => {
      state.updateLoading = true;
    },

    updateBrandSuccess: (state, action: PayloadAction<IProductBrand>) => {
      state.updateLoading = false;

      state.brands = state.brands.map((b) =>
        b.id === action.payload.id ? action.payload : b,
      );
    },

    updateBrandFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* DELETE */
    deleteBrandStart: (state) => {
      state.deleteLoading = true;
    },

    deleteBrandSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.brands = state.brands.filter(
        (b) => b.id !== action.payload,
      );
    },

    deleteBrandFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* RESET */
    clearBrandState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchBrandsStart,
  fetchBrandsSuccess,
  fetchBrandsFailure,

  createBrandStart,
  createBrandSuccess,
  createBrandFailure,

  fetchSingleBrandStart,
  fetchSingleBrandSuccess,
  fetchSingleBrandFailure,

  updateBrandStart,
  updateBrandSuccess,
  updateBrandFailure,

  deleteBrandStart,
  deleteBrandSuccess,
  deleteBrandFailure,

  clearBrandState,
} = productBrandSlice.actions;

export default productBrandSlice.reducer;