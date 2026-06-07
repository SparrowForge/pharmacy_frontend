// redux/features/payment-methods/paymentMethodSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPaymentMethod } from "@/src/types/paymentMethod.types";

interface IPaymentMethodState {
  paymentMethods: IPaymentMethod[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singlePaymentMethod: IPaymentMethod | null;
  singleLoading: boolean;
  singleError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IPaymentMethodState = {
  paymentMethods: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singlePaymentMethod: null,
  singleLoading: false,
  singleError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,

  reducers: {
    /* ================= FETCH ALL ================= */

    fetchPaymentMethodsStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchPaymentMethodsSuccess: (
      state,
      action: PayloadAction<{
        data: IPaymentMethod[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.paymentMethods = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchPaymentMethodsFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE ================= */

    createPaymentMethodStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createPaymentMethodSuccess: (
      state,
      action: PayloadAction<IPaymentMethod>,
    ) => {
      state.createLoading = false;

      state.paymentMethods.unshift(action.payload);
      state.total += 1;
    },

    createPaymentMethodFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= SINGLE ================= */

    fetchSinglePaymentMethodStart: (state) => {
      state.singleLoading = true;
      state.singleError = null;
    },

    fetchSinglePaymentMethodSuccess: (
      state,
      action: PayloadAction<IPaymentMethod>,
    ) => {
      state.singleLoading = false;
      state.singlePaymentMethod = action.payload;
    },

    fetchSinglePaymentMethodFailure: (state, action: PayloadAction<string>) => {
      state.singleLoading = false;
      state.singleError = action.payload;
    },

    /* ================= UPDATE ================= */

    updatePaymentMethodStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updatePaymentMethodSuccess: (
      state,
      action: PayloadAction<IPaymentMethod>,
    ) => {
      state.updateLoading = false;

      const updated = action.payload;

      state.paymentMethods = state.paymentMethods.map((item) =>
        item.id === updated.id ? updated : item,
      );

      if (state.singlePaymentMethod?.id === updated.id) {
        state.singlePaymentMethod = updated;
      }
    },

    updatePaymentMethodFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE ================= */

    deletePaymentMethodStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deletePaymentMethodSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      const id = action.payload;

      state.paymentMethods = state.paymentMethods.filter(
        (item) => item.id !== id,
      );

      if (state.singlePaymentMethod?.id === id) {
        state.singlePaymentMethod = null;
      }

      state.total -= 1;
    },

    deletePaymentMethodFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearPaymentMethodState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchPaymentMethodsStart,
  fetchPaymentMethodsSuccess,
  fetchPaymentMethodsFailure,

  createPaymentMethodStart,
  createPaymentMethodSuccess,
  createPaymentMethodFailure,

  fetchSinglePaymentMethodStart,
  fetchSinglePaymentMethodSuccess,
  fetchSinglePaymentMethodFailure,

  updatePaymentMethodStart,
  updatePaymentMethodSuccess,
  updatePaymentMethodFailure,

  deletePaymentMethodStart,
  deletePaymentMethodSuccess,
  deletePaymentMethodFailure,

  clearPaymentMethodState,
} = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
