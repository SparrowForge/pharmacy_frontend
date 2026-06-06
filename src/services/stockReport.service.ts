// stockReport.service.ts

import axiosInstance from "./axios";
import { IStockReportQuery, IStockReportResponse } from "@/src/types/stockReport.types";



export const getStockReportService = async (
  params: IStockReportQuery,
): Promise<IStockReportResponse> => {
  const response = await axiosInstance.get(`/reports/stock`, {
    params,
  });

  return response.data;
};