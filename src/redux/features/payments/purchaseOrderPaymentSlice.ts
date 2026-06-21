import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPurchaseOrderResponse,
} from "@/src/types/purchaseOrderPayment.types";

interface IPurchaseOrderPaymentState {
  data: IPurchaseOrderResponse | null;

  fetchLoading: boolean;
  error: string | null;
}

const initialState: IPurchaseOrderPaymentState = {
  data: null,
  fetchLoading: false,
  error: null,
};

const purchaseOrderPaymentSlice = createSlice({
  name: "purchaseOrderPayment",
  initialState,
  reducers: {
    fetchPurchaseOrderPaymentStart: (state) => {
      state.fetchLoading = true;
      state.error = null;
    },

    fetchPurchaseOrderPaymentSuccess: (
      state,
      action: PayloadAction<IPurchaseOrderResponse>,
    ) => {
      state.fetchLoading = false;
      state.data = action.payload;
    },

    fetchPurchaseOrderPaymentFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.fetchLoading = false;
      state.error = action.payload;
    },

    clearPurchaseOrderPayment: (state) => {
      state.data = null;
      state.error = null;
      state.fetchLoading = false;
    },
  },
});

export const {
  fetchPurchaseOrderPaymentStart,
  fetchPurchaseOrderPaymentSuccess,
  fetchPurchaseOrderPaymentFailure,
  clearPurchaseOrderPayment,
} = purchaseOrderPaymentSlice.actions;

export default purchaseOrderPaymentSlice.reducer;