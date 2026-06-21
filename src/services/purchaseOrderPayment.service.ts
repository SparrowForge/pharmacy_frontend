import axiosInstance from "./axios";

import {
  IPurchaseOrderPaymentRequest,
  IPurchaseOrderResponse,
} from "@/src/types/purchaseOrderPayment.types";

const addPurchaseOrderPaymentService = async (
  id: string,
  data: IPurchaseOrderPaymentRequest,
): Promise<IPurchaseOrderResponse> => {
  const response = await axiosInstance.post<IPurchaseOrderResponse>(
    `/purchase_orders/${id}/payments`,
    data,
  );

  return response.data;
};

export const purchaseOrderPaymentService = {
  addPurchaseOrderPaymentService,
};