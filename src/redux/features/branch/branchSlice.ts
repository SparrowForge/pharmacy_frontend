import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBranch } from "@/src/types/branch.types";

interface IBranchState {
  branches: IBranch[];
  fetchLoading: boolean;

  page: number;
  limit: number;
  total: number;

  createLoading: boolean;
  error: string | null;
}

const initialState: IBranchState = {
  branches: [],
  fetchLoading: false,
  createLoading: true,
  page: 1,
  limit: 10,
  total: 0,
  error: null,
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    fetchBranchesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchBranchesSuccess: (
      state,
      action: PayloadAction<{
        data: IBranch[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;
      state.branches = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchBranchesFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    createBranchStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createBranchSuccess: (state, action) => {
      state.createLoading = false;

      // optional: push new branch directly to UI list
      state.branches.unshift(action.payload);
    },

    createBranchFailure: (state, action) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    clearBranchState: (state) => {
      state.fetchLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchBranchesStart,
  fetchBranchesSuccess,
  fetchBranchesFailure,

  createBranchStart,
  createBranchSuccess,
  createBranchFailure,

  clearBranchState,
} = branchSlice.actions;

export default branchSlice.reducer;
