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

  singleBranch: IBranch | null;
  singleBranchLoading: boolean;

  updateLoading: boolean;
  deleteLoading: boolean;
  singleLoading: boolean;

  selectedBranch: IBranch | null;
}

const initialState: IBranchState = {
  branches: [],
  fetchLoading: false,
  createLoading: false,
  page: 1,
  limit: 10,
  total: 0,
  error: null,

  singleBranch: null,
  singleBranchLoading: false,

  updateLoading: false,
  deleteLoading: false,
  singleLoading: false,

  selectedBranch: null,
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    /* FETCH */
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

    /* CREATE */
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

    /* SINGLE BRANCH */
    fetchSingleBranchStart: (state) => {
      state.singleBranchLoading = true;
      state.error = null;
    },

    fetchSingleBranchSuccess: (state, action: PayloadAction<IBranch>) => {
      state.singleBranchLoading = false;
      state.singleBranch = action.payload;
    },

    fetchSingleBranchFailure: (state, action: PayloadAction<string>) => {
      state.singleBranchLoading = false;
      state.error = action.payload;
    },

    /* UPDATE */
    updateBranchStart: (state) => {
      state.updateLoading = true;
    },

    updateBranchSuccess: (state, action: PayloadAction<IBranch>) => {
      state.updateLoading = false;

      state.branches = state.branches.map((branch) =>
        branch.id === action.payload.id ? action.payload : branch,
      );
    },

    updateBranchFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* DELETE */
    deleteBranchStart: (state) => {
      state.deleteLoading = true;
    },

    deleteBranchSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      state.branches = state.branches.filter(
        (branch) => branch.id !== action.payload,
      );
    },

    deleteBranchFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
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

  fetchSingleBranchStart,
  fetchSingleBranchSuccess,
  fetchSingleBranchFailure,

  updateBranchStart,
  updateBranchSuccess,
  updateBranchFailure,

  deleteBranchStart,
  deleteBranchSuccess,
  deleteBranchFailure,

  clearBranchState,
} = branchSlice.actions;

export default branchSlice.reducer;
