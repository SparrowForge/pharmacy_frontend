// stockReportSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IStockReportItem,
  IStockReportTotals,
} from "@/src/types/stockReport.types";

interface IStockReportState {
  data: IStockReportItem[];
  totals: IStockReportTotals | null;

  fetchLoading: boolean;
  error: string | null;

  filters: {
    start_date: string;
    end_date: string;
    category_id?: string;
    product_id?: string;
  };
}

const initialState: IStockReportState = {
  data: [],
  totals: null,

  fetchLoading: false,
  error: null,

  filters: {
    start_date: "",
    end_date: "",
    category_id: undefined,
    product_id: undefined,
  },
};

const stockReportSlice = createSlice({
  name: "stockReport",
  initialState,
  reducers: {
    setStockFilters: (
      state,
      action: PayloadAction<Partial<IStockReportState["filters"]>>,
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearStockFilters: (state) => {
      state.filters = initialState.filters;
    },

    fetchStockReportStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchStockReportSuccess: (
      state,
      action: PayloadAction<{
        data: IStockReportItem[];
        totals: IStockReportTotals;
        filters: any;
      }>,
    ) => {
      state.fetchLoading = false;
      state.data = action.payload.data;
      state.totals = action.payload.totals;
    },

    fetchStockReportFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setStockFilters,
  clearStockFilters,
  fetchStockReportStart,
  fetchStockReportSuccess,
  fetchStockReportFailure,
} = stockReportSlice.actions;

export default stockReportSlice.reducer;
