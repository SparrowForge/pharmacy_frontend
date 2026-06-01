import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { purchaseOrderService } from "@/src/services/purchaseOrder.service";

import {
  fetchPurchaseOrdersStart,
  fetchPurchaseOrdersSuccess,
  fetchPurchaseOrdersFailure,
  createPurchaseOrderStart,
  createPurchaseOrderSuccess,
  createPurchaseOrderFailure,
  fetchSinglePurchaseOrderStart,
  fetchSinglePurchaseOrderSuccess,
  fetchSinglePurchaseOrderFailure,
  updatePurchaseOrderStart,
  updatePurchaseOrderSuccess,
  updatePurchaseOrderFailure,
  deletePurchaseOrderStart,
  deletePurchaseOrderSuccess,
  deletePurchaseOrderFailure,
} from "@/src/redux/features/purchase-order/purchaseOrderSlice";

import {
  ICreatePurchaseOrderPayload,
  IUpdatePurchaseOrderPayload,
} from "@/src/types/purchaseOrder.types";

export const usePurchaseOrders = () => {
  const dispatch = useAppDispatch();

  const purchaseOrderState = useAppSelector((state) => state.purchaseOrders);

  const fetchPurchaseOrders = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      supplierId?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchPurchaseOrdersStart());

        const res = await purchaseOrderService.getAllPurchaseOrders({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          supplierId: params?.supplierId,
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchPurchaseOrdersSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchPurchaseOrdersFailure(
            error?.response?.data?.message || "Failed to fetch purchase orders",
          ),
        );
      }
    },
    [dispatch],
  );

  const createPurchaseOrder = useCallback(
    async (payload: ICreatePurchaseOrderPayload) => {
      try {
        dispatch(createPurchaseOrderStart());

        const res =
          await purchaseOrderService.createPurchaseOrderService(payload);

        dispatch(createPurchaseOrderSuccess(res));

        toast.success("Purchase order created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create purchase order";

        dispatch(createPurchaseOrderFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  const fetchSinglePurchaseOrder = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSinglePurchaseOrderStart());

        const res =
          await purchaseOrderService.getSinglePurchaseOrderService(id);

        dispatch(fetchSinglePurchaseOrderSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch purchase order";

        dispatch(fetchSinglePurchaseOrderFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  const updatePurchaseOrder = useCallback(
    async (id: string, payload: IUpdatePurchaseOrderPayload) => {
      try {
        dispatch(updatePurchaseOrderStart());

        const res = await purchaseOrderService.updatePurchaseOrderService(
          id,
          payload,
        );

        dispatch(updatePurchaseOrderSuccess(res));

        toast.success("Purchase order updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update purchase order";

        dispatch(updatePurchaseOrderFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  const deletePurchaseOrder = useCallback(
    async (id: string) => {
      try {
        dispatch(deletePurchaseOrderStart());

        const res = await purchaseOrderService.deletePurchaseOrderService(id);

        dispatch(deletePurchaseOrderSuccess(id));

        toast.success(res?.message || "Purchase order deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete purchase order";

        dispatch(deletePurchaseOrderFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchPurchaseOrders,
    createPurchaseOrder,
    fetchSinglePurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,

    ...purchaseOrderState,
  };
};
