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
} from "@/src/redux/features/purchase-order/purchaseOrderReceiveSlice";

import { IReceivePurchaseOrderPayload } from "@/src/types/purchaseOrderReceive.types";

export const usePurchaseOrderReceive = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const state = useAppSelector((state) => state.purchaseOrderReceive);

  const receivePurchaseOrder = useCallback(
    async (id: string, payload: IReceivePurchaseOrderPayload) => {
      try {
        dispatch(createPurchaseOrderReceiveStart());

        const res = await purchaseOrderReceiveService.receivePurchaseOrder(
          id,
          payload,
        );

        dispatch(createPurchaseOrderReceiveSuccess(res));

        toast.success(res?.message || "Purchase order received successfully");

        router.push("/dashboard/purchase-reciev");

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

  return {
    receivePurchaseOrder,
    fetchPurchaseReceipts,
    ...state,
  };
};
