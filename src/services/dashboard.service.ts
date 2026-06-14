import axiosInstance from "./axios";

import {
  IDashboardSummary,
  IDashboardSummaryQuery,
  ITodaySalesResponse,
  ITotalOrdersResponse,
  ILowStockResponse,
  IExpiringSoonResponse,
  IDashboardPaginationQuery,
  IExpiringSoonQuery,
} from "@/src/types/dashboard.types";

const getDashboardSummary = async (
  params?: IDashboardSummaryQuery,
): Promise<IDashboardSummary> => {
  const res = await axiosInstance.get("/dashboard/summary", { params });

  return res.data;
};

const getTodaySales = async (
  params?: IDashboardPaginationQuery,
): Promise<ITodaySalesResponse> => {
  const res = await axiosInstance.get("/dashboard/today-sales", { params });

  return res.data;
};

const getTotalOrders = async (
  params?: IDashboardPaginationQuery,
): Promise<ITotalOrdersResponse> => {
  const res = await axiosInstance.get("/dashboard/total-orders", { params });

  return res.data;
};

const getLowStock = async (
  params?: IDashboardPaginationQuery,
): Promise<ILowStockResponse> => {
  const res = await axiosInstance.get("/dashboard/low-stock", { params });

  return res.data;
};

const getExpiringSoon = async (
  params?: IExpiringSoonQuery,
): Promise<IExpiringSoonResponse> => {
  const res = await axiosInstance.get("/dashboard/expiring-soon", { params });

  return res.data;
};

export const dashboardService = {
  getDashboardSummary,
  getTodaySales,
  getTotalOrders,
  getLowStock,
  getExpiringSoon,
};
