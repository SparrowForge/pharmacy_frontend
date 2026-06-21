import { IPurchaseReportItem, IPurchaseReportTotals } from "@/src/types/stockReport.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPurchaseReportState {
  purchaseData: IPurchaseReportItem[];
  purchaseTotals: IPurchaseReportTotals | null;

  fetchLoading: boolean;
  error: string | null;

  filters: {
    start_date: string;
    end_date: string;
    supplier_id?: string;
    category_id?: string;
    product_id?: string;
  };
}

const initialState: IPurchaseReportState = {
  purchaseData: [],
  purchaseTotals: null,

  fetchLoading: false,
  error: null,

  filters: {
    start_date: "",
    end_date: "",
    supplier_id: undefined,
    category_id: undefined,
    product_id: undefined,
  },
};

const purchaseReportSlice = createSlice({
  name: "purchaseReport",
  initialState,

  reducers: {
    setPurchaseFilters: (
      state,
      action: PayloadAction<Partial<IPurchaseReportState["filters"]>>,
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearPurchaseFilters: (state) => {
      state.filters = initialState.filters;
    },

    fetchPurchaseReportStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchPurchaseReportSuccess: (
      state,
      action: PayloadAction<{
        purchaseData: IPurchaseReportItem[];
        purchaseTotals: IPurchaseReportTotals;
        filters: any;
      }>,
    ) => {
      state.fetchLoading = false;
      state.purchaseData = action.payload.purchaseData;
      state.purchaseTotals = action.payload.purchaseTotals;
      state.filters = action.payload.filters;
    },

    fetchPurchaseReportFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    clearPurchaseReport: (state) => {
      state.purchaseData = [];
      state.purchaseTotals = null;
      state.error = null;
      state.fetchLoading = false;
    },
  },
});

export const {
  setPurchaseFilters,
  clearPurchaseFilters,
  fetchPurchaseReportStart,
  fetchPurchaseReportSuccess,
  fetchPurchaseReportFailure,
  clearPurchaseReport,
} = purchaseReportSlice.actions;

export default purchaseReportSlice.reducer;