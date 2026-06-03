// purchaseOrderReceive.service.ts

import axiosInstance from "./axios";

import {
  IPurchaseReceiptsResponse,
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

export const getPurchaseReceiptsService = async (
  page = 1,
  limit = 10
): Promise<IPurchaseReceiptsResponse> => {
  const response = await axiosInstance.get(`/purchase_receipts`, {
    params: { page, limit },
  });

  return response.data;
};

export const purchaseOrderReceiveService = {
  receivePurchaseOrder,
  getPurchaseReceipts: getPurchaseReceiptsService,
};