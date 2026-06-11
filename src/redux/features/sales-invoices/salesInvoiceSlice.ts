import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ISalesInvoice,
  ISalesInvoicesResponse,
} from "@/src/types/salesInvoice.types";

interface ISalesInvoiceState {
  salesInvoices: ISalesInvoice[];

  fetchLoading: boolean;
  createLoading: boolean;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: ISalesInvoiceState = {
  salesInvoices: [],

  fetchLoading: false,
  createLoading: false,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const salesInvoiceSlice = createSlice({
  name: "salesInvoice",
  initialState,

  reducers: {
    // CREATE
    createSalesInvoiceStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createSalesInvoiceSuccess: (
      state,
      action: PayloadAction<ISalesInvoice>,
    ) => {
      state.createLoading = false;
      // state.salesInvoices.unshift(action.payload);
    },

    createSalesInvoiceFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    // FETCH
    fetchSalesInvoicesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchSalesInvoicesSuccess: (
      state,
      action: PayloadAction<{
        data: ISalesInvoice[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.salesInvoices = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchSalesInvoicesFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createSalesInvoiceStart,
  createSalesInvoiceSuccess,
  createSalesInvoiceFailure,

  fetchSalesInvoicesStart,
  fetchSalesInvoicesSuccess,
  fetchSalesInvoicesFailure,
} = salesInvoiceSlice.actions;

export default salesInvoiceSlice.reducer;
