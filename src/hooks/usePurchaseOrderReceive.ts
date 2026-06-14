// usePurchaseOrderReceive.ts

import { useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { purchaseOrderReceiveService } from "@/src/services/purchaseOrderReceive.service";

import {
  createPurchaseOrderReceiveStart,
  createPurchaseOrderReceiveSuccess,
  createPurchaseOrderReceiveFailure,
  fetchPurchaseReceiptsStart,
  fetchPurchaseReceiptsSuccess,
  fetchAvailableItemsStart,
  fetchAvailableItemsSuccess,
  fetchAvailableItemsFailure,
  fetchSinglePurchaseReceiptsStart,
  fetchSinglePurchaseReceiptsSuccess,
  fetchSinglePurchaseReceiptsFailure,
} from "@/src/redux/features/purchase-order/purchaseOrderReceiveSlice";

import { IReceivePurchaseOrderPayload } from "@/src/types/purchaseOrderReceive.types";

export const usePurchaseOrderReceive = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const state = useAppSelector((state) => state.purchaseOrderReceive);
  const receivePurchaseOrder = useCallback(
    async (payload: IReceivePurchaseOrderPayload) => {
      try {
        dispatch(createPurchaseOrderReceiveStart());

        const res =
          await purchaseOrderReceiveService.receivePurchaseOrder(payload);

        dispatch(createPurchaseOrderReceiveSuccess(res));

        toast.success(res?.message || "Purchase order received successfully");

        router.push("/dashboard/purchase-receive");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to receive purchase order";

        dispatch(createPurchaseOrderReceiveFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch, router],
  );
  const fetchPurchaseReceipts = useCallback(
    async (page = 1, limit = 10) => {
      try {
        dispatch(fetchPurchaseReceiptsStart());
        const res = await purchaseOrderReceiveService.getPurchaseReceipts(
          page,
          limit,
        );
        dispatch(fetchPurchaseReceiptsSuccess(res));
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch purchase receipts";
        dispatch(createPurchaseOrderReceiveFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  const fetchAvailablePurchaseReceiptItems = useCallback(
    async (productId: string) => {
      try {
        dispatch(fetchAvailableItemsStart());
        const res =
          await purchaseOrderReceiveService.getAvailablePurchaseReceiptItemsService(
            {
              product_id: productId,
            },
          );
        dispatch(fetchAvailableItemsSuccess(res.items));
        return res.items;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch available receipt items";
        dispatch(fetchAvailableItemsFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  const fetchSinglePurchaseReceipt = useCallback(
    async (productId: string) => {
      try {
        dispatch(fetchSinglePurchaseReceiptsStart());
        const res =
          await purchaseOrderReceiveService.getSinglePurchaseRecieptItemService(
            productId,
          );
        dispatch(fetchSinglePurchaseReceiptsSuccess(res));
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch available receipt items";
        dispatch(fetchSinglePurchaseReceiptsFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  return {
    receivePurchaseOrder,
    fetchPurchaseReceipts,
    fetchAvailablePurchaseReceiptItems,
    fetchSinglePurchaseReceipt,
    
    ...state,
  };
};
