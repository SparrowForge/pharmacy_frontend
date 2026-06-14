import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  IDashboardSummary,
  ITodaySale,
  ITotalOrder,
  ILowStockItem,
  IExpiringSoonItem,
} from "@/src/types/dashboard.types";

interface IDashboardState {
  summary: IDashboardSummary | null;

  todaySales: ITodaySale[];
  totalOrders: ITotalOrder[];
  lowStockItems: ILowStockItem[];
  expiringSoonItems: IExpiringSoonItem[];

  summaryLoading: boolean;
  todaySalesLoading: boolean;
  totalOrdersLoading: boolean;
  lowStockLoading: boolean;
  expiringSoonLoading: boolean;

  error: string | null;
}

const initialState: IDashboardState = {
  summary: null,

  todaySales: [],
  totalOrders: [],
  lowStockItems: [],
  expiringSoonItems: [],

  summaryLoading: false,
  todaySalesLoading: false,
  totalOrdersLoading: false,
  lowStockLoading: false,
  expiringSoonLoading: false,

  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    fetchSummaryStart: (state) => {
      state.summaryLoading = true;
    },

    fetchSummarySuccess: (state, action: PayloadAction<IDashboardSummary>) => {
      state.summaryLoading = false;
      state.summary = action.payload;
    },

    fetchTodaySalesStart: (state) => {
      state.todaySalesLoading = true;
    },

    fetchTodaySalesSuccess: (state, action: PayloadAction<ITodaySale[]>) => {
      state.todaySalesLoading = false;
      state.todaySales = action.payload;
    },

    fetchTotalOrdersStart: (state) => {
      state.totalOrdersLoading = true;
    },

    fetchTotalOrdersSuccess: (state, action: PayloadAction<ITotalOrder[]>) => {
      state.totalOrdersLoading = false;
      state.totalOrders = action.payload;
    },

    fetchLowStockStart: (state) => {
      state.lowStockLoading = true;
    },

    fetchLowStockSuccess: (state, action: PayloadAction<ILowStockItem[]>) => {
      state.lowStockLoading = false;
      state.lowStockItems = action.payload;
    },

    fetchExpiringSoonStart: (state) => {
      state.expiringSoonLoading = true;
    },

    fetchExpiringSoonSuccess: (
      state,
      action: PayloadAction<IExpiringSoonItem[]>,
    ) => {
      state.expiringSoonLoading = false;
      state.expiringSoonItems = action.payload;
    },

    fetchDashboardFailure: (state, action: PayloadAction<string>) => {
      state.summaryLoading = false;
      state.todaySalesLoading = false;
      state.totalOrdersLoading = false;
      state.lowStockLoading = false;
      state.expiringSoonLoading = false;

      state.error = action.payload;
    },
  },
});

export const {
  fetchSummaryStart,
  fetchSummarySuccess,

  fetchTodaySalesStart,
  fetchTodaySalesSuccess,

  fetchTotalOrdersStart,
  fetchTotalOrdersSuccess,

  fetchLowStockStart,
  fetchLowStockSuccess,

  fetchExpiringSoonStart,
  fetchExpiringSoonSuccess,

  fetchDashboardFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
