// purchaseOrderReceive.service.ts

import axiosInstance from "./axios";

import {
  IAvailablePurchaseReceiptItemsResponse,
  IGetAvailablePurchaseReceiptItemsQuery,
  IPurchaseReceiptsResponse,
  IReceivePurchaseOrderPayload,
  IReceivePurchaseOrderResponse,
  ISinglePurchaseReceiptItem,
  ISinglePurchaseReceiptResponse,
} from "@/src/types/purchaseOrderReceive.types";

const receivePurchaseOrder = async (
  payload: IReceivePurchaseOrderPayload,
): Promise<IReceivePurchaseOrderResponse> => {
  const response = await axiosInstance.post(`/purchase_receipts`, payload);

  return response.data;
};

export const getPurchaseReceiptsService = async (
  page = 1,
  limit = 10,
): Promise<IPurchaseReceiptsResponse> => {
  const response = await axiosInstance.get(`/purchase_receipts`, {
    params: { page, limit },
  });

  return response.data;
};

const getAvailablePurchaseReceiptItemsService = async (
  params: IGetAvailablePurchaseReceiptItemsQuery,
): Promise<IAvailablePurchaseReceiptItemsResponse> => {
  const response =
    await axiosInstance.get<IAvailablePurchaseReceiptItemsResponse>(
      "/purchase_receipts/available-items",
      {
        params,
      },
    );

  return response.data;
};

export const getSinglePurchaseRecieptItemService = async (
  id: string,
): Promise<ISinglePurchaseReceiptResponse> => {
  const response = await axiosInstance.get<ISinglePurchaseReceiptResponse>(
    `/purchase_receipts/${id}`,
  );

  return response.data;
};

export const purchaseOrderReceiveService = {
  receivePurchaseOrder,
  getPurchaseReceipts: getPurchaseReceiptsService,
  getAvailablePurchaseReceiptItemsService,
  getSinglePurchaseRecieptItemService,
};
