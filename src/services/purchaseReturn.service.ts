import axiosInstance from "./axios";
import {
  ICreatePurchaseReturnPayload,
  IGetPurchaseReturnParams,
  IPurchaseReturnResponse,

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

const getPurchaseReturnsService = async (
  params: IGetPurchaseReturnParams,
): Promise<IPurchaseReturnResponse> => {
  const response = await axiosInstance.get("/purchase_return", {
    params: {
      page: params.page,
      limit: params.limit,

      q: params.q,

      includeDeleted: params.includeDeleted,

      status: params.status,

      supplierId: params.supplierId,

      purchaseOrderId: params.purchaseOrderId,
    },
  });

  return response.data;
};

export const purchaseReturnService = {
  createPurchaseReturn,
  getPurchaseReturnsService,
};