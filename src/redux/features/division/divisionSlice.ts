// redux/features/divisions/divisionSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IDivision } from "@/src/types/division.types";

interface IDivisionState {
  divisions: IDivision[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleDivision: IDivision | null;
  singleDivisionLoading: boolean;
  singleDivisionError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IDivisionState = {
  divisions: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleDivision: null,
  singleDivisionLoading: false,
  singleDivisionError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const divisionSlice = createSlice({
  name: "division",
  initialState,

  reducers: {
    /* ================= FETCH DIVISIONS ================= */

    fetchDivisionsStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchDivisionsSuccess: (
      state,
      action: PayloadAction<{
        data: IDivision[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.divisions = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchDivisionsFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE DIVISION ================= */

    createDivisionStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createDivisionSuccess: (
      state,
      action: PayloadAction<IDivision>,
    ) => {
      state.createLoading = false;

      state.divisions.unshift(action.payload);

      state.total += 1;
    },

    createDivisionFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= GET SINGLE DIVISION ================= */

    fetchSingleDivisionStart: (state) => {
      state.singleDivisionLoading = true;
      state.singleDivisionError = null;
    },

    fetchSingleDivisionSuccess: (
      state,
      action: PayloadAction<IDivision>,
    ) => {
      state.singleDivisionLoading = false;
      state.singleDivision = action.payload;
    },

    fetchSingleDivisionFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.singleDivisionLoading = false;
      state.singleDivisionError = action.payload;
    },

    /* ================= UPDATE DIVISION ================= */

    updateDivisionStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateDivisionSuccess: (
      state,
      action: PayloadAction<IDivision>,
    ) => {
      state.updateLoading = false;

      const updatedDivision = action.payload;

      state.divisions = state.divisions.map((division) =>
        division.id === updatedDivision.id
          ? updatedDivision
          : division,
      );
    },

    updateDivisionFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE DIVISION ================= */

    deleteDivisionStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteDivisionSuccess: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.divisions = state.divisions.filter(
        (division) => division.id !== deletedId,
      );
    },

    deleteDivisionFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearDivisionState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchDivisionsStart,
  fetchDivisionsSuccess,
  fetchDivisionsFailure,

  createDivisionStart,
  createDivisionSuccess,
  createDivisionFailure,

  fetchSingleDivisionStart,
  fetchSingleDivisionSuccess,
  fetchSingleDivisionFailure,

  updateDivisionStart,
  updateDivisionSuccess,
  updateDivisionFailure,

  deleteDivisionStart,
  deleteDivisionSuccess,
  deleteDivisionFailure,

  clearDivisionState,
} = divisionSlice.actions;

export default divisionSlice.reducer;