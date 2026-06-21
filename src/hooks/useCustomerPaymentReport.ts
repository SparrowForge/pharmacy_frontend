import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setFilters,
} from "@/src/redux/features/payments/customerPaymentReportSlice";

import { customerPaymentReportService } from "@/src/services/customerPaymentReport.service";
import { ICustomerPaymentQuery } from "@/src/types/customerPaymentReport.types";

export const useCustomerPaymentReport = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.customerPaymentReport);

  const fetchCustomerPayments = useCallback(
    async (params?: ICustomerPaymentQuery) => {
      try {
        dispatch(fetchStart());

        const query = params || state.filters;

        const res =
          await customerPaymentReportService.getCustomerPaymentReportService(query);

        dispatch(
          fetchSuccess({
            data: res.data,
            total_amount: res.total_amount,
          }),
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch customer payment report";

        dispatch(fetchFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch, state.filters],
  );

  return {
    ...state,
    fetchCustomerPayments,
    setFilters: (data: any) => dispatch(setFilters(data)),
  };
};