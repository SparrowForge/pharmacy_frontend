import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchPurchaseReportStart,
  fetchPurchaseReportSuccess,
  fetchPurchaseReportFailure,
} from "@/src/redux/features/stock-report/purchaseReportSlice";
import { stockReportService } from "../services/stockReport.service";
import { IPurchaseReportParams } from "../types/stockReport.types";

export const usePurchaseOrderReport = () => {
  const dispatch = useAppDispatch();

  const purchaseReport = useAppSelector((state) => state.purchaseReport);

  const fetchPurchaseReport = useCallback(
    async (params: IPurchaseReportParams) => {
      try {
        dispatch(fetchPurchaseReportStart());

        const res = await stockReportService.getPurchaseReportService(params);

        dispatch(
          fetchPurchaseReportSuccess({
            purchaseData: res.data,
            purchaseTotals: res.totals,
            filters: res.filters,
          }),
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch purchase report";

        dispatch(fetchPurchaseReportFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    ...purchaseReport,
    fetchPurchaseReport,
  };
};
