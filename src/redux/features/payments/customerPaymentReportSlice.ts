import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICustomerPaymentItem,
  ICustomerPaymentQuery,
} from "@/src/types/customerPaymentReport.types";

interface State {
  data: ICustomerPaymentItem[];
  total_amount: number;

  fetchLoading: boolean;
  error: string | null;

  filters: ICustomerPaymentQuery;
}

const initialState: State = {
  data: [],
  total_amount: 0,

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

const customerPaymentReportSlice = createSlice({
  name: "customerPaymentReport",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ICustomerPaymentQuery>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
    },

    fetchStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchSuccess: (
      state,
      action: PayloadAction<{
        data: ICustomerPaymentItem[];
        total_amount: number;
      }>,
    ) => {
      state.fetchLoading = false;
      state.data = action.payload.data;
      state.total_amount = action.payload.total_amount;
    },

    fetchFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setFilters,
  resetFilters,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} = customerPaymentReportSlice.actions;

export default customerPaymentReportSlice.reducer;