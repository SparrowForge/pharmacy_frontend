// stockReport.service.ts

import axiosInstance from "./axios";
import { IPurchaseReportParams, IPurchaseReportResponse, ISalesReportParams, ISalesReportResponse, IStockReportQuery, IStockReportResponse } from "@/src/types/stockReport.types";



 const getStockReportService = async (
  params: IStockReportQuery,
): Promise<IStockReportResponse> => {
  const response = await axiosInstance.get(`/reports/stock`, {
    params,
  });

  return response.data;
};

const getSalesReportService = async (
  params: ISalesReportParams,
): Promise<ISalesReportResponse> => {
  const response = await axiosInstance.get<ISalesReportResponse>(
    "/reports/sales",
    {
      params,
    },
  );

  return response.data;
};

const getPurchaseReportService = async (
  params: IPurchaseReportParams,
): Promise<IPurchaseReportResponse> => {
  const res = await axiosInstance.get<IPurchaseReportResponse>(
    "/reports/purchases",
    { params },
  );

  return res.data;
};

export const stockReportService = {
  getStockReportService,
  getSalesReportService,
  getPurchaseReportService
}