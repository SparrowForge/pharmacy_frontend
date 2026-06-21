// useStockReport.ts

import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchStockReportStart,
  fetchStockReportSuccess,
  fetchStockReportFailure,
  setStockFilters,
} from "@/src/redux/features/stock-report/stockReportSlice";

import { stockReportService } from "@/src/services/stockReport.service";
import { IStockReportQuery } from "../types/stockReport.types";

export const useStockReport = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.stockReport);

  const fetchStockReport = useCallback(
    async (params?: IStockReportQuery) => {
      try {
        dispatch(fetchStockReportStart());

        const query = params || state.filters;

        const res = await stockReportService.getStockReportService(query);

        dispatch(
          fetchStockReportSuccess({
            data: res.data,
            totals: res.totals,
            filters: res.filters,
          }),
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch stock report";

        dispatch(fetchStockReportFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch, state.filters],
  );

  

  return {
    fetchStockReport,
    setStockFilters: (data: any) => dispatch(setStockFilters(data)),
    ...state,
  };
};
