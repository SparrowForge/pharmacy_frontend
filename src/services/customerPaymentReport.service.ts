import axiosInstance from "./axios";
import {
  ICustomerPaymentQuery,
  ICustomerPaymentReportResponse,
} from "@/src/types/customerPaymentReport.types";

const getCustomerPaymentReportService = async (
  params: ICustomerPaymentQuery,
): Promise<ICustomerPaymentReportResponse> => {
  const res = await axiosInstance.get("/reports/customer-payments", {
    params,
  });

  return res.data;
};

export const customerPaymentReportService = {
  getCustomerPaymentReportService,
};