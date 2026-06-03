import {
  IPurchaseOrderReceiveItem,
  IReceivePurchaseOrderResponse,
} from "@/src/types/purchaseOrderReceive.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPurchaseOrderReceiveState {
  purchaseOrderReceive: IReceivePurchaseOrderResponse["data"][];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singlePurchaseReceiveOrder: IReceivePurchaseOrderResponse["data"] | null;
  singlePurchaseReceiveOrderLoading: boolean;
  singlePurchaseReceiveOrderError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}
const initialState: IPurchaseOrderReceiveState = {
  purchaseOrderReceive: [],

  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  singlePurchaseReceiveOrder: null,
  singlePurchaseReceiveOrderLoading: false,
  singlePurchaseReceiveOrderError: null,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
};

const purchaseOrderReceiveSlice = createSlice({
  name: "purchaseOrderReceive",
  initialState,

  reducers: {
    createPurchaseOrderReceiveStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createPurchaseOrderReceiveSuccess: (
      state,
      action: PayloadAction<IReceivePurchaseOrderResponse>,
    ) => {
      state.createLoading = false;

      state.purchaseOrderReceive.unshift(action.payload.data);
    },

    createPurchaseOrderReceiveFailure: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.createLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createPurchaseOrderReceiveStart,
  createPurchaseOrderReceiveSuccess,
  createPurchaseOrderReceiveFailure,
} = purchaseOrderReceiveSlice.actions;

export default purchaseOrderReceiveSlice.reducer;
