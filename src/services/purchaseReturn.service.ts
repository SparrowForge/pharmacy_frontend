import axiosInstance from "./axios";
import {
  ICreatePurchaseReturnPayload,
  IPurchaseReturnResponse,
  IPurchaseReturnsResponse,
} from "@/src/types/purchaseReturn.types";

const createPurchaseReturn = async (
  payload: ICreatePurchaseReturnPayload,
): Promise<IPurchaseReturnResponse> => {
  const response = await axiosInstance.post(
    `/purchase_return`,
    payload,
  );

  return response.data;
};

const getPurchaseReturns = async (
  page = 1,
  limit = 10,
): Promise<IPurchaseReturnsResponse> => {
  const response = await axiosInstance.get(`/purchase_return`, {
    params: { page, limit },
  });

  return response.data;
};

export const purchaseReturnService = {
  createPurchaseReturn,
  getPurchaseReturns,
};