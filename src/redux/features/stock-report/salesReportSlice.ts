// salesReportSlice.ts

import { ISalesReportItem, ISalesReportTotals } from "@/src/types/stockReport.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISalesReportState {
  salesData: ISalesReportItem[];
  salesTotals: ISalesReportTotals | null;

  fetchLoading: boolean;
  error: string | null;

  filters: {
    start_date: string;
    end_date: string;
    customer_id?: string;
    category_id?: string;
    product_id?: string;
  };
}

const initialState: ISalesReportState = {
  salesData: [],
  salesTotals: null,

  fetchLoading: false,
  error: null,

  filters: {
    start_date: "",
    end_date: "",
    customer_id: undefined,
    category_id: undefined,
    product_id: undefined,
  },
};

const salesReportSlice = createSlice({
  name: "salesReport",
  initialState,
  reducers: {
    setSalesFilters: (
      state,
      action: PayloadAction<Partial<ISalesReportState["filters"]>>,
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearSalesFilters: (state) => {
      state.filters = initialState.filters;
    },

    fetchSalesReportStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchSalesReportSuccess: (
      state,
      action: PayloadAction<{
        salesData: ISalesReportItem[];
        salesTotals: ISalesReportTotals;
        filters: {
          start_date: string;
          end_date: string;
          customer_id: string | null;
          category_id: string | null;
          product_id: string | null;
        };
      }>,
    ) => {
      state.fetchLoading = false;
      state.salesData = action.payload.salesData;
      state.salesTotals = action.payload.salesTotals;

      state.filters = {
        start_date: action.payload.filters.start_date,
        end_date: action.payload.filters.end_date,
        customer_id: action.payload.filters.customer_id || undefined,
        category_id: action.payload.filters.category_id || undefined,
        product_id: action.payload.filters.product_id || undefined,
      };
    },

    fetchSalesReportFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    clearSalesReport: (state) => {
      state.salesData = [];
      state.salesTotals = null;
      state.error = null;
      state.fetchLoading = false;
      state.filters = initialState.filters;
    },
  },
});

export const {
  setSalesFilters,
  clearSalesFilters,
  fetchSalesReportStart,
  fetchSalesReportSuccess,
  fetchSalesReportFailure,
  clearSalesReport,
} = salesReportSlice.actions;

export default salesReportSlice.reducer;