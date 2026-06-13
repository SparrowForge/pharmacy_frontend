import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISalesReturn } from "@/src/types/salesReturn.types";

interface ISalesReturnState {
  salesReturns: ISalesReturn[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleSalesReturn: ISalesReturn | null;
  singleSalesReturnLoading: boolean;
  singleSalesReturnError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: ISalesReturnState = {
  salesReturns: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleSalesReturn: null,
  singleSalesReturnLoading: false,
  singleSalesReturnError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const salesReturnSlice = createSlice({
  name: "salesReturns",
  initialState,

  reducers: {
    /* FETCH */
    fetchSalesReturnsStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchSalesReturnsSuccess: (
      state,
      action: PayloadAction<{
        data: ISalesReturn[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;
      state.salesReturns = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchSalesReturnsFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* CREATE */
    createSalesReturnStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createSalesReturnSuccess: (
      state,
      action: PayloadAction<ISalesReturn>,
    ) => {
      state.createLoading = false;
      state.salesReturns.unshift(action.payload);
      state.total += 1;
    },

    createSalesReturnFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* SINGLE */
    fetchSingleSalesReturnStart: (state) => {
      state.singleSalesReturnLoading = true;
      state.singleSalesReturnError = null;
    },

    fetchSingleSalesReturnSuccess: (
      state,
      action: PayloadAction<ISalesReturn>,
    ) => {
      state.singleSalesReturnLoading = false;
      state.singleSalesReturn = action.payload;
    },

    fetchSingleSalesReturnFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.singleSalesReturnLoading = false;
      state.singleSalesReturnError = action.payload;
    },

    /* UPDATE */
    updateSalesReturnStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateSalesReturnSuccess: (
      state,
      action: PayloadAction<ISalesReturn>,
    ) => {
      state.updateLoading = false;

      state.salesReturns = state.salesReturns.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },

    updateSalesReturnFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* DELETE */
    deleteSalesReturnStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteSalesReturnSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.salesReturns = state.salesReturns.filter(
        (i) => i.id !== action.payload,
      );
    },

    deleteSalesReturnFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSalesReturnsStart,
  fetchSalesReturnsSuccess,
  fetchSalesReturnsFailure,

  createSalesReturnStart,
  createSalesReturnSuccess,
  createSalesReturnFailure,

  fetchSingleSalesReturnStart,
  fetchSingleSalesReturnSuccess,
  fetchSingleSalesReturnFailure,

  updateSalesReturnStart,
  updateSalesReturnSuccess,
  updateSalesReturnFailure,

  deleteSalesReturnStart,
  deleteSalesReturnSuccess,
  deleteSalesReturnFailure,
} = salesReturnSlice.actions;

export default salesReturnSlice.reducer;