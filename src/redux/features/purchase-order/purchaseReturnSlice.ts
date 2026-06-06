
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPurchaseReturn,
  IPurchaseReturnResponse,
} from "@/src/types/purchaseReturn.types";

interface IPurchaseReturnState {
  purchaseReturns: IPurchaseReturn[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singlePurchaseReturn: IPurchaseReturn | null;
  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IPurchaseReturnState = {
  purchaseReturns: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singlePurchaseReturn: null,
  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const purchaseReturnSlice = createSlice({
  name: "purchaseReturn",
  initialState,
  reducers: {
    // CREATE
    createPurchaseReturnStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createPurchaseReturnSuccess: (
      state,
      action: PayloadAction<IPurchaseReturnResponse>,
    ) => {
      state.createLoading = false;
      state.purchaseReturns.unshift(action.payload.data as any);
    },

    createPurchaseReturnFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    // FETCH
    fetchPurchaseReturnStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchPurchaseReturnSuccess: (
      state,
      action: PayloadAction<{
        data: IPurchaseReturn[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;
      state.purchaseReturns = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchPurchaseReturnFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createPurchaseReturnStart,
  createPurchaseReturnSuccess,
  createPurchaseReturnFailure,

  fetchPurchaseReturnStart,
  fetchPurchaseReturnSuccess,
  fetchPurchaseReturnFailure,
} = purchaseReturnSlice.actions;

export default purchaseReturnSlice.reducer;

