
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICountry } from "@/src/types/country.types";

interface ICountryState {
  countries: ICountry[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleCountry: ICountry | null;
  singleCountryLoading: boolean;
  singleCountryError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: ICountryState = {
  countries: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleCountry: null,
  singleCountryLoading: false,
  singleCountryError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const countrySlice = createSlice({
  name: "country",
  initialState,

  reducers: {
    /* ================= FETCH COUNTRIES ================= */

    fetchCountriesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchCountriesSuccess: (
      state,
      action: PayloadAction<{
        data: ICountry[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.countries = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchCountriesFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE COUNTRY ================= */

    createCountryStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createCountrySuccess: (
      state,
      action: PayloadAction<ICountry>,
    ) => {
      state.createLoading = false;

      state.countries.unshift(action.payload);

      state.total += 1;
    },

    createCountryFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= GET SINGLE COUNTRY ================= */

    fetchSingleCountryStart: (state) => {
      state.singleCountryLoading = true;
      state.singleCountryError = null;
    },

    fetchSingleCountrySuccess: (
      state,
      action: PayloadAction<ICountry>,
    ) => {
      state.singleCountryLoading = false;
      state.singleCountry = action.payload;
    },

    fetchSingleCountryFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.singleCountryLoading = false;
      state.singleCountryError = action.payload;
    },

    /* ================= UPDATE COUNTRY ================= */

    updateCountryStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateCountrySuccess: (
      state,
      action: PayloadAction<ICountry>,
    ) => {
      state.updateLoading = false;

      const updatedCountry = action.payload;

      state.countries = state.countries.map((country) =>
        country.id === updatedCountry.id
          ? updatedCountry
          : country,
      );
    },

    updateCountryFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE COUNTRY ================= */

    deleteCountryStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteCountrySuccess: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.countries = state.countries.filter(
        (country) => country.id !== deletedId,
      );
    },

    deleteCountryFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearCountryState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,

  createCountryStart,
  createCountrySuccess,
  createCountryFailure,

  fetchSingleCountryStart,
  fetchSingleCountrySuccess,
  fetchSingleCountryFailure,

  updateCountryStart,
  updateCountrySuccess,
  updateCountryFailure,

  deleteCountryStart,
  deleteCountrySuccess,
  deleteCountryFailure,

  clearCountryState,
} = countrySlice.actions;

export default countrySlice.reducer;