import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductOffer } from "@/src/types/productOffers.types";

interface IProductOfferState {
  offers: IProductOffer[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleOffer: IProductOffer | null;
  singleOfferLoading: boolean;
  singleOfferError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}

const initialState: IProductOfferState = {
  offers: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singleOffer: null,
  singleOfferLoading: false,
  singleOfferError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const productOfferSlice = createSlice({
  name: "productOffer",
  initialState,
  reducers: {
    /* ================= FETCH ================= */
    fetchOffersStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchOffersSuccess: (
      state,
      action: PayloadAction<{
        data: IProductOffer[];
        page: number;
        limit: number;
        total: number;
      }>,
    ) => {
      state.fetchLoading = false;

      state.offers = action.payload.data;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },

    fetchOffersFailure: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    /* ================= CREATE ================= */
    createOfferStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createOfferSuccess: (state, action: PayloadAction<IProductOffer>) => {
      state.createLoading = false;

      state.offers.unshift(action.payload);
      state.total += 1;
    },

    createOfferFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* ================= SINGLE ================= */
    fetchSingleOfferStart: (state) => {
      state.singleOfferLoading = true;
      state.singleOfferError = null;
    },

    fetchSingleOfferSuccess: (state, action: PayloadAction<IProductOffer>) => {
      state.singleOfferLoading = false;
      state.singleOffer = action.payload;
    },

    fetchSingleOfferFailure: (state, action: PayloadAction<string>) => {
      state.singleOfferLoading = false;
      state.singleOfferError = action.payload;
    },

    /* ================= UPDATE ================= */
    updateOfferStart: (state) => {
      state.updateLoading = true;
      state.error = null;
    },

    updateOfferSuccess: (state, action: PayloadAction<IProductOffer>) => {
      state.updateLoading = false;

      const updated = action.payload;

      state.offers = state.offers.map((o) =>
        o.id === updated.id ? updated : o,
      );
    },

    updateOfferFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE ================= */
    deleteOfferStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteOfferSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      state.offers = state.offers.filter((o) => o.id !== action.payload);

      state.total -= 1;
    },

    deleteOfferFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    /* ================= RESET ================= */
    clearOfferState: (state) => {
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchOffersStart,
  fetchOffersSuccess,
  fetchOffersFailure,

  createOfferStart,
  createOfferSuccess,
  createOfferFailure,

  fetchSingleOfferStart,
  fetchSingleOfferSuccess,
  fetchSingleOfferFailure,

  updateOfferStart,
  updateOfferSuccess,
  updateOfferFailure,

  deleteOfferStart,
  deleteOfferSuccess,
  deleteOfferFailure,

  clearOfferState,
} = productOfferSlice.actions;

export default productOfferSlice.reducer;
