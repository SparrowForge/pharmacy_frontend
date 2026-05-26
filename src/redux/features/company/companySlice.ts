

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICompany } from "@/src/types/company.types";

interface ICompanySliceState {
  companies: ICompany[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleCompany: ICompany | null;
  singleCompanyLoading: boolean;
  singleCompanyError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: ICompanySliceState = {
  companies: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleCompany: null,
  singleCompanyLoading: false,
  singleCompanyError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const companySlice = createSlice({
  name: "company",
  initialState,

  reducers: {
    /* ================= FETCH COMPANIES ================= */

    fetchCompaniesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchCompaniesSuccess: (
      state,
      action: PayloadAction<{
        data: ICompany[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.companies = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchCompaniesFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE COMPANY ================= */

    createCompanyStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createCompanySuccess: (state, action: PayloadAction<ICompany>) => {
      state.createLoading = false;

      state.companies.unshift(action.payload);

      state.total += 1;
    },

    createCompanyFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= GET SINGLE COMPANY ================= */

    fetchSingleCompanyStart: (state) => {
      state.singleCompanyLoading = true;
      state.singleCompanyError = null;
    },

    fetchSingleCompanySuccess: (state, action: PayloadAction<ICompany>) => {
      state.singleCompanyLoading = false;
      state.singleCompany = action.payload;
    },

    fetchSingleCompanyFailure: (state, action: PayloadAction<string>) => {
      state.singleCompanyLoading = false;
      state.singleCompanyError = action.payload;
    },

    /* ================= UPDATE COMPANY ================= */

    updateCompanyStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateCompanySuccess: (state, action: PayloadAction<ICompany>) => {
      state.updateLoading = false;

      const updatedCompany = action.payload;

      state.companies = state.companies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company,
      );
    },

    updateCompanyFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE COMPANY ================= */

    deleteCompanyStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteCompanySuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.companies = state.companies.filter(
        (company) => company.id !== deletedId,
      );
    },

    deleteCompanyFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearCompanyState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchCompaniesStart,
  fetchCompaniesSuccess,
  fetchCompaniesFailure,

  createCompanyStart,
  createCompanySuccess,
  createCompanyFailure,

  fetchSingleCompanyStart,
  fetchSingleCompanySuccess,
  fetchSingleCompanyFailure,

  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,

  deleteCompanyStart,
  deleteCompanySuccess,
  deleteCompanyFailure,

  clearCompanyState,
} = companySlice.actions;

export default companySlice.reducer;
