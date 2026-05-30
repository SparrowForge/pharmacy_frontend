import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductCategory } from "@/src/types/productCategory.types";

interface State {
  categories: IProductCategory[];

  single: IProductCategory | null;

  loading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: State = {
  categories: [],
  single: null,

  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const slice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {
    /* LIST */
    fetchStart: (state) => {
      state.loading = true;
    },

    fetchSuccess: (
      state,
      action: PayloadAction<{
        data: IProductCategory[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.loading = false;
      state.categories = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* CREATE */
    createStart: (state) => {
      state.createLoading = true;
    },

    createSuccess: (state, action: PayloadAction<IProductCategory>) => {
      state.createLoading = false;
      state.categories.unshift(action.payload);
    },

    createFail: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* SINGLE */
    singleStart: (state) => {
      state.loading = true;
    },

    singleSuccess: (state, action: PayloadAction<IProductCategory>) => {
      state.loading = false;
      state.single = action.payload;
    },

    singleFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* UPDATE */
    updateStart: (state) => {
      state.updateLoading = true;
    },

    updateSuccess: (state, action: PayloadAction<IProductCategory>) => {
      state.updateLoading = false;

      state.categories = state.categories.map((c) =>
        c.id === action.payload.id ? action.payload : c,
      );
    },

    updateFail: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* DELETE */
    deleteStart: (state) => {
      state.deleteLoading = true;
    },

    deleteSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      state.categories = state.categories.filter(
        (c) => c.id !== action.payload,
      );
    },

    deleteFail: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFail,

  createStart,
  createSuccess,
  createFail,

  singleStart,
  singleSuccess,
  singleFail,

  updateStart,
  updateSuccess,
  updateFail,

  deleteStart,
  deleteSuccess,
  deleteFail,
} = slice.actions;

export default slice.reducer;
