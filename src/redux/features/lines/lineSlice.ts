

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ILine } from "@/src/types/line.types";

interface ILineSliceState {
  lines: ILine[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleLine: ILine | null;
  singleLineLoading: boolean;
  singleLineError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: ILineSliceState = {
  lines: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleLine: null,
  singleLineLoading: false,
  singleLineError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const lineSlice = createSlice({
  name: "line",
  initialState,

  reducers: {
    /* ================= FETCH LINES ================= */

    fetchLinesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchLinesSuccess: (
      state,
      action: PayloadAction<{
        data: ILine[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.lines = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchLinesFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE LINE ================= */

    createLineStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createLineSuccess: (state, action: PayloadAction<ILine>) => {
      state.createLoading = false;

      state.lines.unshift(action.payload);

      state.total += 1;
    },

    createLineFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= GET SINGLE LINE ================= */

    fetchSingleLineStart: (state) => {
      state.singleLineLoading = true;
      state.singleLineError = null;
    },

    fetchSingleLineSuccess: (state, action: PayloadAction<ILine>) => {
      state.singleLineLoading = false;
      state.singleLine = action.payload;
    },

    fetchSingleLineFailure: (state, action: PayloadAction<string>) => {
      state.singleLineLoading = false;
      state.singleLineError = action.payload;
    },

    /* ================= UPDATE LINE ================= */

    updateLineStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateLineSuccess: (state, action: PayloadAction<ILine>) => {
      state.updateLoading = false;

      const updatedLine = action.payload;

      state.lines = state.lines.map((line) =>
        line.id === updatedLine.id ? updatedLine : line,
      );
    },

    updateLineFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE LINE ================= */

    deleteLineStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteLineSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.lines = state.lines.filter((line) => line.id !== deletedId);
    },

    deleteLineFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearLineState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchLinesStart,
  fetchLinesSuccess,
  fetchLinesFailure,

  createLineStart,
  createLineSuccess,
  createLineFailure,

  fetchSingleLineStart,
  fetchSingleLineSuccess,
  fetchSingleLineFailure,

  updateLineStart,
  updateLineSuccess,
  updateLineFailure,

  deleteLineStart,
  deleteLineSuccess,
  deleteLineFailure,

  clearLineState,
} = lineSlice.actions;

export default lineSlice.reducer;
