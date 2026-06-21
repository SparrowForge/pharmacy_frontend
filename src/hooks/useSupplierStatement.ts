import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchSupplierStatementStart,
  fetchSupplierStatementSuccess,
  fetchSupplierStatementFailure,
  setSupplierStatementFilters,
  setSupplierId,
} from "@/src/redux/features/statement/supplierStatementSlice";
import { ISupplierStatementParams } from "../types/statements.types";
import { statementService } from "../services/statement.service";

export const useSupplierStatement = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.supplierStatement);

  const fetchSupplierStatement = useCallback(
    async (params?: ISupplierStatementParams) => {
      try {
        dispatch(fetchSupplierStatementStart());

        const query = params || {
          supplierId: state.supplier_id!,
          filters: state.filters,
        };

        const res = await statementService.getSupplierStatementService(query);

        dispatch(
          fetchSupplierStatementSuccess({
            data: res.data,
            totals: res.totals,
          }),
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch supplier statement";

        dispatch(fetchSupplierStatementFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch, state.supplier_id, state.filters],
  );

  return {
    fetchSupplierStatement,

    setSupplierStatementFilters: (data: any) =>
      dispatch(setSupplierStatementFilters(data)),

    setSupplierId: (id: string) => dispatch(setSupplierId(id)),

    ...state,
  };
};
