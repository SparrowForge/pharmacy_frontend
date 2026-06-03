import axiosInstance from "./axios";

import {
  ICreatePurchaseOrderPayload,
  IDeletePurchaseOrderResponse,
  IGetPurchaseOrdersQuery,
  IGetSinglePurchaseOrder,
  IPurchaseOrder,
  IPurchaseOrderResponse,
  IUpdatePurchaseOrderPayload,
} from "@/src/types/purchaseOrder.types";

const getAllPurchaseOrders = async (
  params: IGetPurchaseOrdersQuery,
): Promise<IPurchaseOrderResponse> => {
  const response = await axiosInstance.get("/purchase_orders", {
    params,
  });

  return response.data;
};

const createPurchaseOrderService = async (
  payload: ICreatePurchaseOrderPayload,
): Promise<IPurchaseOrder> => {
  const response = await axiosInstance.post("/purchase_orders", payload);

  return response.data;
};

const getSinglePurchaseOrderService = async (
  id: string,
): Promise<IGetSinglePurchaseOrder> => {
  const response = await axiosInstance.get<IGetSinglePurchaseOrder>(
    `/purchase_orders/${id}`,
  );

  return response.data;
};

const updatePurchaseOrderService = async (
  id: string,
  payload: IUpdatePurchaseOrderPayload,
): Promise<IPurchaseOrder> => {
  const response = await axiosInstance.patch(`/purchase_orders/${id}`, payload);

  return response.data;
};

const deletePurchaseOrderService = async (
  id: string,
): Promise<IDeletePurchaseOrderResponse> => {
  const response = await axiosInstance.delete(`/purchase_orders/${id}`);

  return response.data;
};

export const purchaseOrderService = {
  getAllPurchaseOrders,
  createPurchaseOrderService,
  getSinglePurchaseOrderService,
  updatePurchaseOrderService,
  deletePurchaseOrderService,
};
