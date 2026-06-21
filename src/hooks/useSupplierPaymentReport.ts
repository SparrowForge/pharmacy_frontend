import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchSupplierPaymentStart,
  fetchSupplierPaymentSuccess,
  fetchSupplierPaymentFailure,
  setSupplierPaymentFilters,
} from "@/src/redux/features/payments/supplierPaymentReportSlice";

import { supplierPaymentReportService } from "@/src/services/supplierPaymentReport.service";

import { ISupplierPaymentParams } from "@/src/types/supplierPaymentReport.types";
import { useRouter } from "next/navigation";

export const useSupplierPaymentReport = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.supplierPaymentReport);

  const fetchSupplierPayments = useCallback(
    async (params?: ISupplierPaymentParams) => {
      try {
        dispatch(fetchSupplierPaymentStart());

        const query = params || state.filters;

        const res =
          await supplierPaymentReportService.getSupplierPaymentReportService(
            query,
          );

        dispatch(
          fetchSupplierPaymentSuccess({
            data: res.data,
            total: res.total,
            total_amount: res.total_amount,
            page: res.page,
            limit: res.limit,
          }),
        );
        router.push("/dashboard/purchase-order-payment/supplier-report");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch supplier payments";

        dispatch(fetchSupplierPaymentFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch, state.filters],
  );

  return {
    fetchSupplierPayments,
    setSupplierPaymentFilters: (data: any) =>
      dispatch(setSupplierPaymentFilters(data)),

    ...state,
  };
};
