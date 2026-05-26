// redux/features/zones/zoneSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IZone } from "@/src/types/zone.types";

interface IZoneSliceState {
  zones: IZone[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleZone: IZone | null;
  singleZoneLoading: boolean;
  singleZoneError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IZoneSliceState = {
  zones: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleZone: null,
  singleZoneLoading: false,
  singleZoneError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const zoneSlice = createSlice({
  name: "zone",
  initialState,

  reducers: {
    /* ================= FETCH ZONES ================= */

    fetchZonesStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchZonesSuccess: (
      state,
      action: PayloadAction<{
        data: IZone[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.zones = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchZonesFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE ZONE ================= */

    createZoneStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createZoneSuccess: (state, action: PayloadAction<IZone>) => {
      state.createLoading = false;

      state.zones.unshift(action.payload);

      state.total += 1;
    },

    createZoneFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= GET SINGLE ZONE ================= */

    fetchSingleZoneStart: (state) => {
      state.singleZoneLoading = true;
      state.singleZoneError = null;
    },

    fetchSingleZoneSuccess: (state, action: PayloadAction<IZone>) => {
      state.singleZoneLoading = false;
      state.singleZone = action.payload;
    },

    fetchSingleZoneFailure: (state, action: PayloadAction<string>) => {
      state.singleZoneLoading = false;
      state.singleZoneError = action.payload;
    },

    /* ================= UPDATE ZONE ================= */

    updateZoneStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateZoneSuccess: (state, action: PayloadAction<IZone>) => {
      state.updateLoading = false;

      const updatedZone = action.payload;

      state.zones = state.zones.map((zone) =>
        zone.id === updatedZone.id ? updatedZone : zone,
      );
    },

    updateZoneFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE ZONE ================= */

    deleteZoneStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteZoneSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      const deletedId = action.payload;

      state.zones = state.zones.filter((zone) => zone.id !== deletedId);
    },

    deleteZoneFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */

    clearZoneState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchZonesStart,
  fetchZonesSuccess,
  fetchZonesFailure,

  createZoneStart,
  createZoneSuccess,
  createZoneFailure,

  fetchSingleZoneStart,
  fetchSingleZoneSuccess,
  fetchSingleZoneFailure,

  updateZoneStart,
  updateZoneSuccess,
  updateZoneFailure,

  deleteZoneStart,
  deleteZoneSuccess,
  deleteZoneFailure,

  clearZoneState,
} = zoneSlice.actions;

export default zoneSlice.reducer;
