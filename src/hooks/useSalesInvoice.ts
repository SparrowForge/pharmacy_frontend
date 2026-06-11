import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { salesInvoiceService } from "@/src/services/salesInvoice.service";

import {
  createSalesInvoiceStart,
  createSalesInvoiceSuccess,
  createSalesInvoiceFailure,
  fetchSalesInvoicesStart,
  fetchSalesInvoicesSuccess,
  fetchSalesInvoicesFailure,
  fetchSingleSalesInvoiceStart,
  fetchSingleSalesInvoiceSuccess,
  fetchSingleSalesInvoiceFailure,
  updateSalesInvoiceStart,
  updateSalesInvoiceSuccess,
  updateSalesInvoiceFailure,
  deleteSalesInvoiceStart,
  deleteSalesInvoiceSuccess,
  deleteSalesInvoiceFailure,
} from "@/src/redux/features/sales-invoices/salesInvoiceSlice";

import {
  ICreateSalesInvoicePayload,
  IGetSalesInvoicesQuery,
  ISalesInvoiceData,
} from "@/src/types/salesInvoice.types";

export const useSalesInvoice = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.salesInvoices);

  // CREATE
  const createSalesInvoice = useCallback(
    async (payload: ICreateSalesInvoicePayload) => {
      try {
        dispatch(createSalesInvoiceStart());
        const res =
          await salesInvoiceService.createSalesInvoiceService(payload);
        // backend returns list response → take latest item if needed
        const created = res;
        // dispatch(createSalesInvoiceSuccess(created));
        toast.success("Sales invoice created successfully");
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create sales invoice";
        dispatch(createSalesInvoiceFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  /* ================= FETCH ================= */

  const fetchSalesInvoices = useCallback(
    async (params?: IGetSalesInvoicesQuery) => {
      try {
        dispatch(fetchSalesInvoicesStart());
        const res = await salesInvoiceService.getAllSalesInvoices(
          params ?? ({} as IGetSalesInvoicesQuery),
        );
        dispatch(fetchSalesInvoicesSuccess(res));
        return res;
      } catch (error: any) {
        dispatch(
          fetchSalesInvoicesFailure(
            error?.response?.data?.message || "Failed to fetch sales invoices",
          ),
        );

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleSalesInvoice = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleSalesInvoiceStart());
        const res = await salesInvoiceService.getSingleSalesInvoiceService(id);
        dispatch(fetchSingleSalesInvoiceSuccess(res));
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch sales invoice";
        dispatch(fetchSingleSalesInvoiceFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateSalesInvoice = useCallback(
    async (id: string, payload: Partial<ISalesInvoiceData>) => {
      try {
        dispatch(updateSalesInvoiceStart());
        const res = await salesInvoiceService.updateSalesInvoiceService(
          id,
          payload,
        );
        dispatch(updateSalesInvoiceSuccess(res));
        toast.success("Sales invoice updated successfully");
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update sales invoice";
        dispatch(updateSalesInvoiceFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */
  const deleteSalesInvoice = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteSalesInvoiceStart());
        const res = await salesInvoiceService.deleteSalesInvoiceService(id);
        dispatch(deleteSalesInvoiceSuccess(id));
        toast.success(res?.message || "Sales invoice deleted successfully");
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete sales invoice";
        dispatch(deleteSalesInvoiceFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  return {
    ...state,

    createSalesInvoice,
    fetchSalesInvoices,
    fetchSingleSalesInvoice,
    updateSalesInvoice,
    deleteSalesInvoice,
  };
};
