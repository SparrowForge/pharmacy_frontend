import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductBadge } from "@/src/types/productBadge.types";

interface ProductBadgeState {
  productBadges: IProductBadge[];
  singleProductBadge: IProductBadge | null;

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ProductBadgeState = {
  productBadges: [],
  singleProductBadge: null,

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const productBadgeSlice = createSlice({
  name: "productBadge",
  initialState,
  reducers: {
    setProductBadges: (state, action: PayloadAction<IProductBadge[]>) => {
      state.productBadges = action.payload;
    },

    setSingleProductBadge: (
      state,
      action: PayloadAction<IProductBadge | null>,
    ) => {
      state.singleProductBadge = action.payload;
    },

    setFetchLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchLoading = action.payload;
    },

    setCreateLoading: (state, action: PayloadAction<boolean>) => {
      state.createLoading = action.payload;
    },

    setUpdateLoading: (state, action: PayloadAction<boolean>) => {
      state.updateLoading = action.payload;
    },

    setDeleteLoading: (state, action: PayloadAction<boolean>) => {
      state.deleteLoading = action.payload;
    },
  },
});

export const {
  setProductBadges,
  setSingleProductBadge,

  setFetchLoading,
  setCreateLoading,
  setUpdateLoading,
  setDeleteLoading,
} = productBadgeSlice.actions;

export default productBadgeSlice.reducer;
