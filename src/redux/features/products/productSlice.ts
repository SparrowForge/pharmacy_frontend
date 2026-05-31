import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProduct } from "@/src/types/product.types";

interface IProductSliceState {
  products: IProduct[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleProduct: IProduct | null;
  singleProductLoading: boolean;
  singleProductError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IProductSliceState = {
  products: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleProduct: null,
  singleProductLoading: false,
  singleProductError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    fetchProductsStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchProductsSuccess: (
      state,
      action: PayloadAction<{
        data: IProduct[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.products = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    createProductStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createProductSuccess: (state, action: PayloadAction<IProduct>) => {
      state.createLoading = false;

      state.products.unshift(action.payload);

      state.total += 1;
    },

    createProductFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    fetchSingleProductStart: (state) => {
      state.singleProductLoading = true;
      state.singleProductError = null;
    },

    fetchSingleProductSuccess: (state, action: PayloadAction<IProduct>) => {
      state.singleProductLoading = false;
      state.singleProduct = action.payload;
    },

    fetchSingleProductFailure: (state, action: PayloadAction<string>) => {
      state.singleProductLoading = false;
      state.singleProductError = action.payload;
    },

    updateProductStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateProductSuccess: (state, action: PayloadAction<IProduct>) => {
      state.updateLoading = false;

      const updatedProduct = action.payload;

      state.products = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );
    },

    updateProductFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    deleteProductStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteProductSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },

    deleteProductFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    clearProductState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,

  createProductStart,
  createProductSuccess,
  createProductFailure,

  fetchSingleProductStart,
  fetchSingleProductSuccess,
  fetchSingleProductFailure,

  updateProductStart,
  updateProductSuccess,
  updateProductFailure,

  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,

  clearProductState,
} = productSlice.actions;

export default productSlice.reducer;
