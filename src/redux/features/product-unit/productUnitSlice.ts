import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductUnit } from "@/src/types/productUnit.types";

interface IProductUnitState {
  units: IProductUnit[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleUnit: IProductUnit | null;
  singleUnitLoading: boolean;
  singleUnitError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IProductUnitState = {
  units: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleUnit: null,
  singleUnitLoading: false,
  singleUnitError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const productUnitSlice = createSlice({
  name: "productUnits",
  initialState,
  reducers: {
    /* ================= FETCH ================= */
    fetchUnitsStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchUnitsSuccess: (
      state,
      action: PayloadAction<{
        data: IProductUnit[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.units = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchUnitsFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE ================= */
    createUnitStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createUnitSuccess: (state, action: PayloadAction<IProductUnit>) => {
      state.createLoading = false;

      state.units.unshift(action.payload);
      state.total += 1;
    },

    createUnitFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= SINGLE ================= */
    fetchSingleUnitStart: (state) => {
      state.singleUnitLoading = true;
      state.singleUnitError = null;
    },

    fetchSingleUnitSuccess: (state, action: PayloadAction<IProductUnit>) => {
      state.singleUnitLoading = false;
      state.singleUnit = action.payload;
    },

    fetchSingleUnitFailure: (state, action: PayloadAction<string>) => {
      state.singleUnitLoading = false;
      state.singleUnitError = action.payload;
    },

    /* ================= UPDATE ================= */
    updateUnitStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateUnitSuccess: (state, action: PayloadAction<IProductUnit>) => {
      state.updateLoading = false;

      const updated = action.payload;

      state.units = state.units.map((u) => (u.id === updated.id ? updated : u));
    },

    updateUnitFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE ================= */
    deleteUnitStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteUnitSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      state.units = state.units.filter((u) => u.id !== action.payload);

      state.total -= 1;
    },

    deleteUnitFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */
    clearUnitState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchUnitsStart,
  fetchUnitsSuccess,
  fetchUnitsFailure,

  createUnitStart,
  createUnitSuccess,
  createUnitFailure,

  fetchSingleUnitStart,
  fetchSingleUnitSuccess,
  fetchSingleUnitFailure,

  updateUnitStart,
  updateUnitSuccess,
  updateUnitFailure,

  deleteUnitStart,
  deleteUnitSuccess,
  deleteUnitFailure,

  clearUnitState,
} = productUnitSlice.actions;

export default productUnitSlice.reducer;
