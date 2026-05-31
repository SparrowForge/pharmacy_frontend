import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductBatch } from "@/src/types/productBatch.types";

interface IProductBatchState {
  batches: IProductBatch[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleBatch: IProductBatch | null;
  singleBatchLoading: boolean;
  singleBatchError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IProductBatchState = {
  batches: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleBatch: null,
  singleBatchLoading: false,
  singleBatchError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const productBatchSlice = createSlice({
  name: "productBatch",
  initialState,
  reducers: {
    /* ================= FETCH ================= */
    fetchBatchesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchBatchesSuccess: (
      state,
      action: PayloadAction<{
        data: IProductBatch[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;
      state.batches = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchBatchesFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE ================= */
    createBatchStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createBatchSuccess: (state, action: PayloadAction<IProductBatch>) => {
      state.createLoading = false;
      state.batches.unshift(action.payload);
      state.total += 1;
    },

    createBatchFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= SINGLE ================= */
    fetchSingleBatchStart: (state) => {
      state.singleBatchLoading = true;
      state.singleBatchError = null;
    },

    fetchSingleBatchSuccess: (state, action: PayloadAction<IProductBatch>) => {
      state.singleBatchLoading = false;
      state.singleBatch = action.payload;
    },

    fetchSingleBatchFailure: (state, action: PayloadAction<string>) => {
      state.singleBatchLoading = false;
      state.singleBatchError = action.payload;
    },

    /* ================= UPDATE ================= */
    updateBatchStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateBatchSuccess: (state, action: PayloadAction<IProductBatch>) => {
      state.updateLoading = false;

      const updated = action.payload;

      state.batches = state.batches.map((b) =>
        b.id === updated.id ? updated : b,
      );
    },

    updateBatchFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE ================= */
    deleteBatchStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteBatchSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.batches = state.batches.filter((b) => b.id !== action.payload);
    },

    deleteBatchFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */
    clearBatchState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchBatchesStart,
  fetchBatchesSuccess,
  fetchBatchesFailure,

  createBatchStart,
  createBatchSuccess,
  createBatchFailure,

  fetchSingleBatchStart,
  fetchSingleBatchSuccess,
  fetchSingleBatchFailure,

  updateBatchStart,
  updateBatchSuccess,
  updateBatchFailure,

  deleteBatchStart,
  deleteBatchSuccess,
  deleteBatchFailure,

  clearBatchState,
} = productBatchSlice.actions;

export default productBatchSlice.reducer;
