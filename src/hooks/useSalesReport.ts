import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchSalesReportStart,
  fetchSalesReportSuccess,
  fetchSalesReportFailure,
  setSalesFilters,
  clearSalesFilters,
  clearSalesReport,
} from "@/src/redux/features/stock-report/salesReportSlice";
import { ISalesReportParams } from "../types/stockReport.types";
import { stockReportService } from "../services/stockReport.service";

export const useSalesReport = () => {
  const dispatch = useAppDispatch();

  const salesReport = useAppSelector((state) => state.salesReport);

  const fetchSalesReport = useCallback(
    async (params: ISalesReportParams) => {
      try {
        dispatch(fetchSalesReportStart());

        const response = await stockReportService.getSalesReportService(params);

        dispatch(
          fetchSalesReportSuccess({
            salesData: response.data,
            salesTotals: response.totals,
            filters: response.filters,
          }),
        );

        return response;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch sales report";

        dispatch(fetchSalesReportFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  const updateFilters = useCallback(
    (filters: Partial<typeof salesReport.filters>) => {
      dispatch(setSalesFilters(filters));
    },
    [dispatch, salesReport.filters],
  );

  const resetFilters = useCallback(() => {
    dispatch(clearSalesFilters());
  }, [dispatch]);

  const resetSalesReport = useCallback(() => {
    dispatch(clearSalesReport());
  }, [dispatch]);

  return {
    salesData: salesReport.salesData,
    salesTotals: salesReport.salesTotals,
    filters: salesReport.filters,
    fetchLoading: salesReport.fetchLoading,
    error: salesReport.error,

    fetchSalesReport,
    updateFilters,
    resetFilters,
    resetSalesReport,
  };
};
