

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IRegion } from "@/src/types/region.types";

interface IRegionSliceState {
  regions: IRegion[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleRegion: IRegion | null;
  singleRegionLoading: boolean;
  singleRegionError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IRegionSliceState = {
  regions: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleRegion: null,
  singleRegionLoading: false,
  singleRegionError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const regionSlice = createSlice({
  name: "region",
  initialState,

  reducers: {
    /* ================= FETCH REGIONS ================= */

    fetchRegionsStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchRegionsSuccess: (
      state,
      action: PayloadAction<{
        data: IRegion[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.regions = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchRegionsFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE REGION ================= */

    createRegionStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createRegionSuccess: (
      state,
      action: PayloadAction<IRegion>,
    ) => {
      state.createLoading = false;

      state.regions.unshift(action.payload);

      state.total += 1;
    },

    createRegionFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= GET SINGLE REGION ================= */

    fetchSingleRegionStart: (state) => {
      state.singleRegionLoading = true;
      state.singleRegionError = null;
    },

    fetchSingleRegionSuccess: (
      state,
      action: PayloadAction<IRegion>,
    ) => {
      state.singleRegionLoading = false;
      state.singleRegion = action.payload;
    },

    fetchSingleRegionFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.singleRegionLoading = false;
      state.singleRegionError = action.payload;
    },

    /* ================= UPDATE REGION ================= */

    updateRegionStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateRegionSuccess: (
      state,
      action: PayloadAction<IRegion>,
    ) => {
      state.updateLoading = false;

      const updatedRegion = action.payload;

      state.regions = state.regions.map((region) =>
        region.id === updatedRegion.id
          ? updatedRegion
          : region,
      );
    },

    updateRegionFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE REGION ================= */

    deleteRegionStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteRegionSuccess: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.regions = state.regions.filter(
        (region) => region.id !== deletedId,
      );
    },

    deleteRegionFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearRegionState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchRegionsStart,
  fetchRegionsSuccess,
  fetchRegionsFailure,

  createRegionStart,
  createRegionSuccess,
  createRegionFailure,

  fetchSingleRegionStart,
  fetchSingleRegionSuccess,
  fetchSingleRegionFailure,

  updateRegionStart,
  updateRegionSuccess,
  updateRegionFailure,

  deleteRegionStart,
  deleteRegionSuccess,
  deleteRegionFailure,

  clearRegionState,
} = regionSlice.actions;

export default regionSlice.reducer;