import { IProductTag, IProductTagResponse } from "@/src/types/productTag.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductTagState {
  productTags: IProductTag[];
  page: number;
  limit: number;
  total: number;
  fetchLoading: boolean;

  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleProductTag: IProductTag | null;
}

const initialState: ProductTagState = {
  productTags: [],
  page: 1,
  limit: 10,
  total: 0,

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleProductTag: null,
};

const productTagSlice = createSlice({
  name: "productTag",
  initialState,
  reducers: {
    /* FETCH LIST */
    fetchProductTagsStart: (state) => {
      state.fetchLoading = true;
    },

    fetchProductTagsSuccess: (
      state,
      action: PayloadAction<IProductTagResponse>,
    ) => {
      state.fetchLoading = false;
      state.productTags = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchProductTagsFail: (state) => {
      state.fetchLoading = false;
    },

    /* SINGLE */
    setSingleProductTag: (state, action: PayloadAction<IProductTag>) => {
      state.singleProductTag = action.payload;
    },

    clearSingleProductTag: (state) => {
      state.singleProductTag = null;
    },

    /* CREATE */
    createProductTagStart: (state) => {
      state.createLoading = true;
    },

    createProductTagSuccess: (state) => {
      state.createLoading = false;
    },

    createProductTagFail: (state) => {
      state.createLoading = false;
    },

    /* UPDATE */
    updateProductTagStart: (state) => {
      state.updateLoading = true;
    },

    updateProductTagSuccess: (state) => {
      state.updateLoading = false;
    },

    updateProductTagFail: (state) => {
      state.updateLoading = false;
    },

    /* DELETE */
    deleteProductTagStart: (state) => {
      state.deleteLoading = true;
    },

    deleteProductTagSuccess: (state) => {
      state.deleteLoading = false;
    },

    deleteProductTagFail: (state) => {
      state.deleteLoading = false;
    },
  },
});

export const {
  fetchProductTagsStart,
  fetchProductTagsSuccess,
  fetchProductTagsFail,

  setSingleProductTag,
  clearSingleProductTag,

  createProductTagStart,
  createProductTagSuccess,
  createProductTagFail,

  updateProductTagStart,
  updateProductTagSuccess,
  updateProductTagFail,

  deleteProductTagStart,
  deleteProductTagSuccess,
  deleteProductTagFail,
} = productTagSlice.actions;

export default productTagSlice.reducer;
