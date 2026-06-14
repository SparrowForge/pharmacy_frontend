import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { dashboardService } from "@/src/services/dashboard.service";

import {
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
} from "@/src/redux/features/dashboard/dashboardSlice";

export const useDashboard = () => {
  const dispatch = useAppDispatch();

  const dashboardState = useAppSelector((state) => state.dashboardData);

  const handleError = (error: any, fallback: string) => {
    dispatch(fetchDashboardFailure(error?.response?.data?.message || fallback));
  };

  const fetchSummary = useCallback(
    async (expiry_days?: number) => {
      try {
        dispatch(fetchSummaryStart());

        const res = await dashboardService.getDashboardSummary({
          expiry_days,
        });

        dispatch(fetchSummarySuccess(res));
      } catch (error) {
        handleError(error, "Failed to fetch dashboard summary");
      }
    },
    [dispatch],
  );

  const fetchTodaySales = useCallback(
    async (page = 1, limit = 20) => {
      try {
        dispatch(fetchTodaySalesStart());

        const res = await dashboardService.getTodaySales({
          page,
          limit,
        });

        dispatch(fetchTodaySalesSuccess(res.data));
      } catch (error) {
        handleError(error, "Failed to fetch today sales");
      }
    },
    [dispatch],
  );

  const fetchTotalOrders = useCallback(
    async (page = 1, limit = 20) => {
      try {
        dispatch(fetchTotalOrdersStart());

        const res = await dashboardService.getTotalOrders({
          page,
          limit,
        });

        dispatch(fetchTotalOrdersSuccess(res.data));
      } catch (error) {
        handleError(error, "Failed to fetch total orders");
      }
    },
    [dispatch],
  );

  const fetchLowStock = useCallback(
    async (page = 1, limit = 20) => {
      try {
        dispatch(fetchLowStockStart());

        const res = await dashboardService.getLowStock({
          page,
          limit,
        });

        dispatch(fetchLowStockSuccess(res.data));
      } catch (error) {
        handleError(error, "Failed to fetch low stock items");
      }
    },
    [dispatch],
  );

  const fetchExpiringSoon = useCallback(
    async (days = 30, page = 1, limit = 20) => {
      try {
        dispatch(fetchExpiringSoonStart());

        const res = await dashboardService.getExpiringSoon({
          days,
          page,
          limit,
        });

        dispatch(fetchExpiringSoonSuccess(res.data));
      } catch (error) {
        handleError(error, "Failed to fetch expiring products");
      }
    },
    [dispatch],
  );

  return {
    ...dashboardState,

    fetchSummary,
    fetchTodaySales,
    fetchTotalOrders,
    fetchLowStock,
    fetchExpiringSoon,
  };
};
