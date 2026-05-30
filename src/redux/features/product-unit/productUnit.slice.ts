import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductUnit } from "@/src/types/productUnit.types";

interface State {
  units: IProductUnit[];

  page: number;
  limit: number;
  total: number;

  loading: boolean;
  error: string | null;
}

const initialState: State = {
  units: [],

  page: 1,
  limit: 10,
  total: 0,

  loading: false,
  error: null,
};

const slice = createSlice({
  name: "productUnit",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },

    fetchSuccess: (
      state,
      action: PayloadAction<{
        data: IProductUnit[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.loading = false;

      state.units = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createSuccess: (state, action: PayloadAction<IProductUnit>) => {
      state.units.unshift(action.payload);
      state.total += 1;
    },

    updateSuccess: (state, action: PayloadAction<IProductUnit>) => {
      state.units = state.units.map((u) =>
        u.id === action.payload.id ? action.payload : u,
      );
    },

    deleteSuccess: (state, action: PayloadAction<string>) => {
      state.units = state.units.filter((u) => u.id !== action.payload);
      state.total -= 1;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFail,
  createSuccess,
  updateSuccess,
  deleteSuccess,
} = slice.actions;

export default slice.reducer;
