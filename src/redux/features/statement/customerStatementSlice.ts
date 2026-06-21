import { ICustomerStatementItem, ICustomerStatementTotals } from "@/src/types/statements.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICustomerStatementState {
  data: ICustomerStatementItem[];
  totals: ICustomerStatementTotals | null;

  fetchLoading: boolean;
  error: string | null;

  customer_id: string | null;

  filters: {
    start_date: string;
    end_date: string;
  };
}

const initialState: ICustomerStatementState = {
  data: [],
  totals: null,

  fetchLoading: false,
  error: null,

  customer_id: null,

  filters: {
    start_date: "",
    end_date: "",
  },
};

const customerStatementSlice = createSlice({
  name: "customerStatement",
  initialState,
  reducers: {
    setCustomerId: (state, action: PayloadAction<string>) => {
      state.customer_id = action.payload;
    },

    setCustomerStatementFilters: (
      state,
      action: PayloadAction<Partial<ICustomerStatementState["filters"]>>,
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearCustomerStatementFilters: (state) => {
      state.filters = initialState.filters;
    },

    fetchCustomerStatementStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchCustomerStatementSuccess: (
      state,
      action: PayloadAction<{
        data: ICustomerStatementItem[];
        totals: ICustomerStatementTotals;
      }>,
    ) => {
      state.fetchLoading = false;
      state.data = action.payload.data;
      state.totals = action.payload.totals;
    },

    fetchCustomerStatementFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCustomerId,
  setCustomerStatementFilters,
  clearCustomerStatementFilters,
  fetchCustomerStatementStart,
  fetchCustomerStatementSuccess,
  fetchCustomerStatementFailure,
} = customerStatementSlice.actions;

export default customerStatementSlice.reducer;