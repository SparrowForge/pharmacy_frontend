import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ISalesInvoiceData,
  ISingleSalesInvoiceResponse,
} from "@/src/types/salesInvoice.types";

interface ISalesInvoiceState {
  salesInvoices: ISalesInvoiceData[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleSalesInvoice: ISingleSalesInvoiceResponse | null;
  singleSalesInvoiceLoading: boolean;
  singleSalesInvoiceError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: ISalesInvoiceState = {
  salesInvoices: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleSalesInvoice: null,
  singleSalesInvoiceLoading: false,
  singleSalesInvoiceError: null,

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
      action: PayloadAction<ISalesInvoiceData>,
    ) => {
      state.createLoading = false;
      // state.salesInvoices.unshift(action.payload);
    },

    createSalesInvoiceFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= FETCH SALES INVOICES ================= */

    fetchSalesInvoicesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchSalesInvoicesSuccess: (
      state,
      action: PayloadAction<{
        data: ISalesInvoiceData[];
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

    /* ================= GET SINGLE SALES INVOICE ================= */

    fetchSingleSalesInvoiceStart: (state) => {
      state.singleSalesInvoiceLoading = true;
      state.singleSalesInvoiceError = null;
    },

    fetchSingleSalesInvoiceSuccess: (
      state,
      action: PayloadAction<ISalesInvoiceData>,
    ) => {
      state.singleSalesInvoiceLoading = false;
      state.singleSalesInvoice = action.payload;
    },

    fetchSingleSalesInvoiceFailure: (state, action: PayloadAction<string>) => {
      state.singleSalesInvoiceLoading = false;
      state.singleSalesInvoiceError = action.payload;
    },

    /* ================= UPDATE SALES INVOICE ================= */

    updateSalesInvoiceStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateSalesInvoiceSuccess: (
      state,
      action: PayloadAction<ISalesInvoiceData>,
    ) => {
      state.updateLoading = false;

      const updatedInvoice = action.payload;

      state.salesInvoices = state.salesInvoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice,
      );

      if (state.singleSalesInvoice?.id === updatedInvoice.id) {
        state.singleSalesInvoice = updatedInvoice;
      }
    },

    updateSalesInvoiceFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE SALES INVOICE ================= */

    deleteSalesInvoiceStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteSalesInvoiceSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.salesInvoices = state.salesInvoices.filter(
        (invoice) => invoice.id !== deletedId,
      );

      state.total = Math.max(0, state.total - 1);

      if (state.singleSalesInvoice?.id === deletedId) {
        state.singleSalesInvoice = null;
      }
    },

    deleteSalesInvoiceFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearSalesInvoiceState: (state) => {
      state.fetchLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;

      state.error = null;
      state.singleSalesInvoiceError = null;
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

  fetchSingleSalesInvoiceStart,
  fetchSingleSalesInvoiceSuccess,
  fetchSingleSalesInvoiceFailure,

  updateSalesInvoiceStart,
  updateSalesInvoiceSuccess,
  updateSalesInvoiceFailure,

  deleteSalesInvoiceStart,
  deleteSalesInvoiceSuccess,
  deleteSalesInvoiceFailure,

  clearSalesInvoiceState,
} = salesInvoiceSlice.actions;

export default salesInvoiceSlice.reducer;
