// redux/features/districts/districtSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IDistrict } from "@/src/types/districts.types";

interface IDistrictState {
  districts: IDistrict[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleDistrict: IDistrict | null;
  singleDistrictLoading: boolean;
  singleDistrictError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IDistrictState = {
  districts: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleDistrict: null,
  singleDistrictLoading: false,
  singleDistrictError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const districtSlice = createSlice({
  name: "district",
  initialState,

  reducers: {
    /* ================= FETCH DISTRICTS ================= */

    fetchDistrictsStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchDistrictsSuccess: (
      state,
      action: PayloadAction<{
        data: IDistrict[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.districts = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchDistrictsFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE DISTRICT ================= */

    createDistrictStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createDistrictSuccess: (
      state,
      action: PayloadAction<IDistrict>,
    ) => {
      state.createLoading = false;

      state.districts.unshift(action.payload);

      state.total += 1;
    },

    createDistrictFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= GET SINGLE DISTRICT ================= */

    fetchSingleDistrictStart: (state) => {
      state.singleDistrictLoading = true;
      state.singleDistrictError = null;
    },

    fetchSingleDistrictSuccess: (
      state,
      action: PayloadAction<IDistrict>,
    ) => {
      state.singleDistrictLoading = false;
      state.singleDistrict = action.payload;
    },

    fetchSingleDistrictFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.singleDistrictLoading = false;
      state.singleDistrictError = action.payload;
    },

    /* ================= UPDATE DISTRICT ================= */

    updateDistrictStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateDistrictSuccess: (
      state,
      action: PayloadAction<IDistrict>,
    ) => {
      state.updateLoading = false;

      const updatedDistrict = action.payload;

      state.districts = state.districts.map((district) =>
        district.id === updatedDistrict.id
          ? updatedDistrict
          : district,
      );
    },

    updateDistrictFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE DISTRICT ================= */

    deleteDistrictStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteDistrictSuccess: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.districts = state.districts.filter(
        (district) => district.id !== deletedId,
      );
    },

    deleteDistrictFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearDistrictState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchDistrictsStart,
  fetchDistrictsSuccess,
  fetchDistrictsFailure,

  createDistrictStart,
  createDistrictSuccess,
  createDistrictFailure,

  fetchSingleDistrictStart,
  fetchSingleDistrictSuccess,
  fetchSingleDistrictFailure,

  updateDistrictStart,
  updateDistrictSuccess,
  updateDistrictFailure,

  deleteDistrictStart,
  deleteDistrictSuccess,
  deleteDistrictFailure,

  clearDistrictState,
} = districtSlice.actions;

export default districtSlice.reducer;