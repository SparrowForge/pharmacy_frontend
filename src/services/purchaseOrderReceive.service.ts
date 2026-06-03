// purchaseOrderReceive.service.ts

import axiosInstance from "./axios";

import {
  IReceivePurchaseOrderPayload,
  IReceivePurchaseOrderResponse,
} from "@/src/types/purchaseOrderReceive.types";

const receivePurchaseOrder = async (
  id: string,
  payload: IReceivePurchaseOrderPayload,
): Promise<IReceivePurchaseOrderResponse> => {
  const response = await axiosInstance.post(
    `/purchase_orders/${id}/receive`,
    payload,
  );

  return response.data;
};

export const purchaseOrderReceiveService = {
  receivePurchaseOrder,
};