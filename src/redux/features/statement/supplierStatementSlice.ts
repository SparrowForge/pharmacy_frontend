import { ISupplierStatementItem, ISupplierStatementTotals } from "@/src/types/statements.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISupplierStatementState {
  data: ISupplierStatementItem[];
  totals: ISupplierStatementTotals | null;

  fetchLoading: boolean;
  error: string | null;

  supplier_id: string | null;

  filters: {
    start_date: string;
    end_date: string;
  };
}

const initialState: ISupplierStatementState = {
  data: [],
  totals: null,

  fetchLoading: false,
  error: null,

  supplier_id: null,

  filters: {
    start_date: "",
    end_date: "",
  },
};

const supplierStatementSlice = createSlice({
  name: "supplierStatement",
  initialState,
  reducers: {
    setSupplierId: (state, action: PayloadAction<string>) => {
      state.supplier_id = action.payload;
    },

    setSupplierStatementFilters: (
      state,
      action: PayloadAction<Partial<ISupplierStatementState["filters"]>>,
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearSupplierStatementFilters: (state) => {
      state.filters = initialState.filters;
    },

    fetchSupplierStatementStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchSupplierStatementSuccess: (
      state,
      action: PayloadAction<{
        data: ISupplierStatementItem[];
        totals: ISupplierStatementTotals;
      }>,
    ) => {
      state.fetchLoading = false;
      state.data = action.payload.data;
      state.totals = action.payload.totals;
    },

    fetchSupplierStatementFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSupplierId,
  setSupplierStatementFilters,
  clearSupplierStatementFilters,
  fetchSupplierStatementStart,
  fetchSupplierStatementSuccess,
  fetchSupplierStatementFailure,
} = supplierStatementSlice.actions;

export default supplierStatementSlice.reducer;