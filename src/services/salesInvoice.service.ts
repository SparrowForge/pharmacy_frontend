import axiosInstance from "./axios";

import {
  ICreateSalesInvoicePayload,
  ISalesInvoicesResponse,
} from "@/src/types/salesInvoice.types";

// CREATE
export const createSalesInvoiceService = async (
  payload: ICreateSalesInvoicePayload,
): Promise<ISalesInvoicesResponse> => {
  const response = await axiosInstance.post("/sales_invoices", payload);

  return response.data;
};

// GET LIST
export const getSalesInvoicesService = async (
  page = 1,
  limit = 10,
): Promise<ISalesInvoicesResponse> => {
  const response = await axiosInstance.get("/sales_invoices", {
    params: { page, limit },
  });

  return response.data;
};
