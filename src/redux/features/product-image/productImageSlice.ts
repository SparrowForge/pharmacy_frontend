import {
  IProductImage,
  IProductImageResponse,
} from "@/src/types/productImage.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductImageState {
  productImages: IProductImage[];

  page: number;
  limit: number;
  total: number;

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleProductImage: IProductImage | null;
}

const initialState: ProductImageState = {
  productImages: [],

  page: 1,
  limit: 10,
  total: 0,

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleProductImage: null,
};

const productImageSlice = createSlice({
  name: "productImage",
  initialState,
  reducers: {
    /* FETCH LIST */
    fetchProductImagesStart: (state) => {
      state.fetchLoading = true;
    },

    fetchProductImagesSuccess: (
      state,
      action: PayloadAction<IProductImageResponse>
    ) => {
      state.fetchLoading = false;
      state.productImages = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchProductImagesFail: (state) => {
      state.fetchLoading = false;
    },

    /* SINGLE */
    setSingleProductImage: (
      state,
      action: PayloadAction<IProductImage>
    ) => {
      state.singleProductImage = action.payload;
    },

    clearSingleProductImage: (state) => {
      state.singleProductImage = null;
    },

    /* CREATE */
    createProductImageStart: (state) => {
      state.createLoading = true;
    },

    createProductImageSuccess: (state) => {
      state.createLoading = false;
    },

    createProductImageFail: (state) => {
      state.createLoading = false;
    },

    /* UPDATE */
    updateProductImageStart: (state) => {
      state.updateLoading = true;
    },

    updateProductImageSuccess: (state) => {
      state.updateLoading = false;
    },

    updateProductImageFail: (state) => {
      state.updateLoading = false;
    },

    /* DELETE */
    deleteProductImageStart: (state) => {
      state.deleteLoading = true;
    },

    deleteProductImageSuccess: (state) => {
      state.deleteLoading = false;
    },

    deleteProductImageFail: (state) => {
      state.deleteLoading = false;
    },
  },
});

export const {
  fetchProductImagesStart,
  fetchProductImagesSuccess,
  fetchProductImagesFail,

  setSingleProductImage,
  clearSingleProductImage,

  createProductImageStart,
  createProductImageSuccess,
  createProductImageFail,

  updateProductImageStart,
  updateProductImageSuccess,
  updateProductImageFail,

  deleteProductImageStart,
  deleteProductImageSuccess,
  deleteProductImageFail,
} = productImageSlice.actions;

export default productImageSlice.reducer;