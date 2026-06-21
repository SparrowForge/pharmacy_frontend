import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchCustomerStatementStart,
  fetchCustomerStatementSuccess,
  fetchCustomerStatementFailure,
  setCustomerStatementFilters,
  setCustomerId,
} from "@/src/redux/features/statement/customerStatementSlice";
import { ICustomerStatementParams } from "../types/statements.types";
import { statementService } from "../services/statement.service";



export const useCustomerStatement = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.customerStatement);

  const fetchCustomerStatement = useCallback(
    async (params?: ICustomerStatementParams) => {
      try {
        dispatch(fetchCustomerStatementStart());

        const query = params || {
          customerId: state.customer_id!,
          filters: state.filters,
        };

        const res =
          await statementService.getCustomerStatementService(query);

        dispatch(
          fetchCustomerStatementSuccess({
            data: res.data,
            totals: res.totals,
          }),
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch customer statement";

        dispatch(fetchCustomerStatementFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch, state.customer_id, state.filters],
  );

  return {
    fetchCustomerStatement,

    setCustomerStatementFilters: (data: any) =>
      dispatch(setCustomerStatementFilters(data)),

    setCustomerId: (id: string) => dispatch(setCustomerId(id)),

    ...state,
  };
};