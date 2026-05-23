import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBranch } from "@/src/types/branch.types";

interface IBranchState {
  branches: IBranch[];
  loading: boolean;
  error: string | null;
}

const initialState: IBranchState = {
  branches: [],
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    fetchBranchesStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchBranchesSuccess: (state, action: PayloadAction<IBranch[]>) => {
      state.loading = false;
      state.branches = action.payload;
    },

    fetchBranchesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearBranchState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchBranchesStart,
  fetchBranchesSuccess,
  fetchBranchesFailure,
  clearBranchState,
} = branchSlice.actions;

export default branchSlice.reducer;
