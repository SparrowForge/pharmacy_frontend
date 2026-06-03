import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IGetSinglePurchaseOrder, IPurchaseOrder } from "@/src/types/purchaseOrder.types";

interface IPurchaseOrderState {
  purchaseOrders: IPurchaseOrder[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singlePurchaseOrder: IGetSinglePurchaseOrder | null;
  singlePurchaseOrderLoading: boolean;
  singlePurchaseOrderError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IPurchaseOrderState = {
  purchaseOrders: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singlePurchaseOrder: null,
  singlePurchaseOrderLoading: false,
  singlePurchaseOrderError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const purchaseOrderSlice = createSlice({
  name: "purchaseOrder",
  initialState,

  reducers: {
    fetchPurchaseOrdersStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchPurchaseOrdersSuccess: (
      state,
      action: PayloadAction<{
        data: IPurchaseOrder[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.purchaseOrders = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchPurchaseOrdersFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    createPurchaseOrderStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createPurchaseOrderSuccess: (
      state,
      action: PayloadAction<IPurchaseOrder>,
    ) => {
      state.createLoading = false;

      state.purchaseOrders.unshift(action.payload);

      state.total += 1;
    },

    createPurchaseOrderFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    fetchSinglePurchaseOrderStart: (state) => {
      state.singlePurchaseOrderLoading = true;
      state.singlePurchaseOrderError = null;
    },

    fetchSinglePurchaseOrderSuccess: (
      state,
      action: PayloadAction<IGetSinglePurchaseOrder>,
    ) => {
      state.singlePurchaseOrderLoading = false;
      state.singlePurchaseOrder = action.payload;
    },

    fetchSinglePurchaseOrderFailure: (state, action: PayloadAction<string>) => {
      state.singlePurchaseOrderLoading = false;
      state.singlePurchaseOrderError = action.payload;
    },

    updatePurchaseOrderStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updatePurchaseOrderSuccess: (
      state,
      action: PayloadAction<IPurchaseOrder>,
    ) => {
      state.updateLoading = false;

      const updated = action.payload;

      state.purchaseOrders = state.purchaseOrders.map((item) =>
        item.id === updated.id ? updated : item,
      );
    },

    updatePurchaseOrderFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    deletePurchaseOrderStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deletePurchaseOrderSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      state.purchaseOrders = state.purchaseOrders.filter(
        (item) => item.id !== action.payload,
      );
    },

    deletePurchaseOrderFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPurchaseOrdersStart,
  fetchPurchaseOrdersSuccess,
  fetchPurchaseOrdersFailure,

  createPurchaseOrderStart,
  createPurchaseOrderSuccess,
  createPurchaseOrderFailure,

  fetchSinglePurchaseOrderStart,
  fetchSinglePurchaseOrderSuccess,
  fetchSinglePurchaseOrderFailure,

  updatePurchaseOrderStart,
  updatePurchaseOrderSuccess,
  updatePurchaseOrderFailure,

  deletePurchaseOrderStart,
  deletePurchaseOrderSuccess,
  deletePurchaseOrderFailure,
} = purchaseOrderSlice.actions;

export default purchaseOrderSlice.reducer;
