import axiosInstance from "./axios";

import {
  ICreateSalesInvoicePayload,
  IDeleteSalesInvoiceResponse,
  IGetSalesInvoicesQuery,
  ISalesInvoiceData,
  ISalesInvoiceResponse,
  ISalesInvoicesResponses,
  ISingleSalesInvoiceResponse,
} from "@/src/types/salesInvoice.types";

// CREATE
const createSalesInvoiceService = async (
  payload: ICreateSalesInvoicePayload,
): Promise<ISalesInvoiceResponse> => {
  const response = await axiosInstance.post("/sales_invoices", payload);

  return response.data;
};



const getAllSalesInvoices = async (
  params: IGetSalesInvoicesQuery,
): Promise<ISalesInvoicesResponses> => {
  const response = await axiosInstance.get<ISalesInvoicesResponses>(
    "/sales_invoices",
    {
      params,
    },
  );

  return response.data;
};

const getSingleSalesInvoiceService = async (
  id: string,
): Promise<ISingleSalesInvoiceResponse> => {
  const response = await axiosInstance.get<ISingleSalesInvoiceResponse>(
    `/sales_invoices/${id}`,
  );

  return response.data;
};

const updateSalesInvoiceService = async (
  id: string,
  payload: Partial<ISalesInvoiceData>,
): Promise<ISalesInvoiceData> => {
  const response = await axiosInstance.patch<ISalesInvoiceData>(
    `/sales_invoices/${id}`,
    payload,
  );

  return response.data;
};

const deleteSalesInvoiceService = async (
  id: string,
): Promise<IDeleteSalesInvoiceResponse> => {
  const response = await axiosInstance.delete<IDeleteSalesInvoiceResponse>(
    `/sales_invoices/${id}`,
  );

  return response.data;
};

export const salesInvoiceService = {
  createSalesInvoiceService,
  getAllSalesInvoices,
  getSingleSalesInvoiceService,
  updateSalesInvoiceService,
  deleteSalesInvoiceService,
};
