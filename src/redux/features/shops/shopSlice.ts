import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "@/src/types/shop.types";

interface IShopState {
  shops: IShop[];
  loading: boolean;
  error: string | null;
}

const initialState: IShopState = {
  shops: [],
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    fetchShopsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchShopsSuccess: (
      state,
      action: PayloadAction<IShop[]>
    ) => {
      state.loading = false;
      state.shops = action.payload;
    },

    fetchShopsFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearShopState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchShopsStart,
  fetchShopsSuccess,
  fetchShopsFailure,
  clearShopState,
} = shopSlice.actions;

export default shopSlice.reducer;