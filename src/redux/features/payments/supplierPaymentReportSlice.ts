import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ISupplierPaymentItem,
} from "@/src/types/supplierPaymentReport.types";

interface ISupplierPaymentState {
  data: ISupplierPaymentItem[];
  total: number;
  total_amount: number;

  page: number;
  limit: number;

  fetchLoading: boolean;
  error: string | null;

  filters: {
    start_date?: string;
    end_date?: string;
    company_id?: string;
    payment_method_id?: string;
    page: number;
    limit: number;
  };
}

const initialState: ISupplierPaymentState = {
  data: [],
  total: 0,
  total_amount: 0,

  page: 1,
  limit: 20,

  fetchLoading: false,
  error: null,

  filters: {
    start_date: "",
    end_date: "",
    company_id: undefined,
    payment_method_id: undefined,
    page: 1,
    limit: 20,
  },
};

const supplierPaymentReportSlice = createSlice({
  name: "supplierPaymentReport",
  initialState,
  reducers: {
    setSupplierPaymentFilters: (
      state,
      action: PayloadAction<Partial<ISupplierPaymentState["filters"]>>,
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearSupplierPaymentFilters: (state) => {
      state.filters = initialState.filters;
    },

    fetchSupplierPaymentStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchSupplierPaymentSuccess: (
      state,
      action: PayloadAction<{
        data: ISupplierPaymentItem[];
        total: number;
        total_amount: number;
        page: number;
        limit: number;
      }>,
    ) => {
      state.fetchLoading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.total_amount = action.payload.total_amount;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },

    fetchSupplierPaymentFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSupplierPaymentFilters,
  clearSupplierPaymentFilters,
  fetchSupplierPaymentStart,
  fetchSupplierPaymentSuccess,
  fetchSupplierPaymentFailure,
} = supplierPaymentReportSlice.actions;

export default supplierPaymentReportSlice.reducer;