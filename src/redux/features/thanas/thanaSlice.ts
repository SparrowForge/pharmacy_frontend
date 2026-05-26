// redux/features/thanas/thanaSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IThana } from "@/src/types/thana.types";

interface IThanaState {
  thanas: IThana[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleThana: IThana | null;
  singleThanaLoading: boolean;
  singleThanaError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IThanaState = {
  thanas: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleThana: null,
  singleThanaLoading: false,
  singleThanaError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const thanaSlice = createSlice({
  name: "thana",
  initialState,

  reducers: {
    /* ================= FETCH THANAS ================= */

    fetchThanasStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchThanasSuccess: (
      state,
      action: PayloadAction<{
        data: IThana[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.thanas = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchThanasFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE THANA ================= */

    createThanaStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createThanaSuccess: (
      state,
      action: PayloadAction<IThana>,
    ) => {
      state.createLoading = false;

      state.thanas.unshift(action.payload);

      state.total += 1;
    },

    createThanaFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= GET SINGLE THANA ================= */

    fetchSingleThanaStart: (state) => {
      state.singleThanaLoading = true;
      state.singleThanaError = null;
    },

    fetchSingleThanaSuccess: (
      state,
      action: PayloadAction<IThana>,
    ) => {
      state.singleThanaLoading = false;
      state.singleThana = action.payload;
    },

    fetchSingleThanaFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.singleThanaLoading = false;
      state.singleThanaError = action.payload;
    },

    /* ================= UPDATE THANA ================= */

    updateThanaStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateThanaSuccess: (
      state,
      action: PayloadAction<IThana>,
    ) => {
      state.updateLoading = false;

      const updatedThana = action.payload;

      state.thanas = state.thanas.map((thana) =>
        thana.id === updatedThana.id
          ? updatedThana
          : thana,
      );
    },

    updateThanaFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE THANA ================= */

    deleteThanaStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteThanaSuccess: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.thanas = state.thanas.filter(
        (thana) => thana.id !== deletedId,
      );
    },

    deleteThanaFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearThanaState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchThanasStart,
  fetchThanasSuccess,
  fetchThanasFailure,

  createThanaStart,
  createThanaSuccess,
  createThanaFailure,

  fetchSingleThanaStart,
  fetchSingleThanaSuccess,
  fetchSingleThanaFailure,

  updateThanaStart,
  updateThanaSuccess,
  updateThanaFailure,

  deleteThanaStart,
  deleteThanaSuccess,
  deleteThanaFailure,

  clearThanaState,
} = thanaSlice.actions;

export default thanaSlice.reducer;