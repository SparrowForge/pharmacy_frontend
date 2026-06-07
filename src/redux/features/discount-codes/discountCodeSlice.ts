// redux/features/discount-codes/discountCodeSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IDiscountCode } from "@/src/types/discountCode.types";

interface IDiscountCodeState {
  discountCodes: IDiscountCode[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleDiscountCode: IDiscountCode | null;
  singleLoading: boolean;
  singleError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IDiscountCodeState = {
  discountCodes: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleDiscountCode: null,
  singleLoading: false,
  singleError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const discountCodeSlice = createSlice({
  name: "discountCode",
  initialState,

  reducers: {
    /* ================= FETCH ALL ================= */

    fetchDiscountCodesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchDiscountCodesSuccess: (
      state,
      action: PayloadAction<{
        data: IDiscountCode[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.discountCodes = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchDiscountCodesFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE ================= */

    createDiscountCodeStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createDiscountCodeSuccess: (
      state,
      action: PayloadAction<IDiscountCode>,
    ) => {
      state.createLoading = false;

      state.discountCodes.unshift(action.payload);
      state.total += 1;
    },

    createDiscountCodeFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= SINGLE ================= */

    fetchSingleDiscountCodeStart: (state) => {
      state.singleLoading = true;
      state.singleError = null;
    },

    fetchSingleDiscountCodeSuccess: (
      state,
      action: PayloadAction<IDiscountCode>,
    ) => {
      state.singleLoading = false;
      state.singleDiscountCode = action.payload;
    },

    fetchSingleDiscountCodeFailure: (state, action: PayloadAction<string>) => {
      state.singleLoading = false;
      state.singleError = action.payload;
    },

    /* ================= UPDATE ================= */

    updateDiscountCodeStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateDiscountCodeSuccess: (
      state,
      action: PayloadAction<IDiscountCode>,
    ) => {
      state.updateLoading = false;

      const updated = action.payload;

      state.discountCodes = state.discountCodes.map((item) =>
        item.id === updated.id ? updated : item,
      );

      if (state.singleDiscountCode?.id === updated.id) {
        state.singleDiscountCode = updated;
      }
    },

    updateDiscountCodeFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE ================= */

    deleteDiscountCodeStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteDiscountCodeSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      const id = action.payload;

      state.discountCodes = state.discountCodes.filter(
        (item) => item.id !== id,
      );

      if (state.singleDiscountCode?.id === id) {
        state.singleDiscountCode = null;
      }

      state.total -= 1;
    },

    deleteDiscountCodeFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearDiscountCodeState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchDiscountCodesStart,
  fetchDiscountCodesSuccess,
  fetchDiscountCodesFailure,

  createDiscountCodeStart,
  createDiscountCodeSuccess,
  createDiscountCodeFailure,

  fetchSingleDiscountCodeStart,
  fetchSingleDiscountCodeSuccess,
  fetchSingleDiscountCodeFailure,

  updateDiscountCodeStart,
  updateDiscountCodeSuccess,
  updateDiscountCodeFailure,

  deleteDiscountCodeStart,
  deleteDiscountCodeSuccess,
  deleteDiscountCodeFailure,

  clearDiscountCodeState,
} = discountCodeSlice.actions;

export default discountCodeSlice.reducer;
