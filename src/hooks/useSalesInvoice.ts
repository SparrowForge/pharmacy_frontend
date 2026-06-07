import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  createSalesInvoiceService,
  getSalesInvoicesService,
} from "@/src/services/salesInvoice.service";

import {
  createSalesInvoiceStart,
  createSalesInvoiceSuccess,
  createSalesInvoiceFailure,
  fetchSalesInvoicesStart,
  fetchSalesInvoicesSuccess,
  fetchSalesInvoicesFailure,
} from "@/src/redux/features/sales-invoices/salesInvoiceSlice";

import { ICreateSalesInvoicePayload } from "@/src/types/salesInvoice.types";

export const useSalesInvoice = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.salesInvoices);

  // CREATE
  const createSalesInvoice = useCallback(
    async (payload: ICreateSalesInvoicePayload) => {
      try {
        dispatch(createSalesInvoiceStart());

        const res = await createSalesInvoiceService(payload);

        // backend returns list response → take latest item if needed
        const created = res.data?.[0];

        dispatch(createSalesInvoiceSuccess(created));

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

  // FETCH
  const fetchSalesInvoices = useCallback(
    async (page = 1, limit = 10) => {
      try {
        dispatch(fetchSalesInvoicesStart());

        const res = await getSalesInvoicesService(page, limit);

        dispatch(
          fetchSalesInvoicesSuccess({
            data: res.data,
            page: res.page,
            limit: res.limit,
            total: res.total,
          }),
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch sales invoices";

        dispatch(fetchSalesInvoicesFailure(message));

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
  };
};
