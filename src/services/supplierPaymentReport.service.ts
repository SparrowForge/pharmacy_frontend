import axiosInstance from "./axios";

import {
  ISupplierPaymentParams,
  ISupplierPaymentReportResponse,
} from "@/src/types/supplierPaymentReport.types";

const getSupplierPaymentReportService = async (
  params: ISupplierPaymentParams,
): Promise<ISupplierPaymentReportResponse> => {
  const response = await axiosInstance.get<ISupplierPaymentReportResponse>(
    "/reports/supplier-payments",
    {
      params,
    },
  );

  return response.data;
};

export const supplierPaymentReportService = {
  getSupplierPaymentReportService,
};