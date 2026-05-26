// redux/features/routes/routeSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IRoute } from "@/src/types/route.types";

interface IRouteSliceState {
  routes: IRoute[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleRoute: IRoute | null;
  singleRouteLoading: boolean;
  singleRouteError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IRouteSliceState = {
  routes: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleRoute: null,
  singleRouteLoading: false,
  singleRouteError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const routeSlice = createSlice({
  name: "route",
  initialState,

  reducers: {
    /* ================= FETCH ROUTES ================= */

    fetchRoutesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchRoutesSuccess: (
      state,
      action: PayloadAction<{
        data: IRoute[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.routes = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchRoutesFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE ROUTE ================= */

    createRouteStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createRouteSuccess: (state, action: PayloadAction<IRoute>) => {
      state.createLoading = false;

      state.routes.unshift(action.payload);

      state.total += 1;
    },

    createRouteFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= GET SINGLE ROUTE ================= */

    fetchSingleRouteStart: (state) => {
      state.singleRouteLoading = true;
      state.singleRouteError = null;
    },

    fetchSingleRouteSuccess: (state, action: PayloadAction<IRoute>) => {
      state.singleRouteLoading = false;
      state.singleRoute = action.payload;
    },

    fetchSingleRouteFailure: (state, action: PayloadAction<string>) => {
      state.singleRouteLoading = false;
      state.singleRouteError = action.payload;
    },

    /* ================= UPDATE ROUTE ================= */

    updateRouteStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateRouteSuccess: (state, action: PayloadAction<IRoute>) => {
      state.updateLoading = false;

      const updatedRoute = action.payload;

      state.routes = state.routes.map((route) =>
        route.id === updatedRoute.id ? updatedRoute : route,
      );
    },

    updateRouteFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE ROUTE ================= */

    deleteRouteStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteRouteSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.routes = state.routes.filter((route) => route.id !== deletedId);
    },

    deleteRouteFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearRouteState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchRoutesStart,
  fetchRoutesSuccess,
  fetchRoutesFailure,

  createRouteStart,
  createRouteSuccess,
  createRouteFailure,

  fetchSingleRouteStart,
  fetchSingleRouteSuccess,
  fetchSingleRouteFailure,

  updateRouteStart,
  updateRouteSuccess,
  updateRouteFailure,

  deleteRouteStart,
  deleteRouteSuccess,
  deleteRouteFailure,

  clearRouteState,
} = routeSlice.actions;

export default routeSlice.reducer;
