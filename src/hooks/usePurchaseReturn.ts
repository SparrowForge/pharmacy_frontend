
import { useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { purchaseReturnService } from "@/src/services/purchaseReturn.service";

import {
  createPurchaseReturnStart,
  createPurchaseReturnSuccess,
  createPurchaseReturnFailure,
  fetchPurchaseReturnStart,
  fetchPurchaseReturnSuccess,
  fetchPurchaseReturnFailure,
} from "@/src/redux/features/purchase-order/purchaseReturnSlice";

import { ICreatePurchaseReturnPayload } from "@/src/types/purchaseReturn.types";

export const usePurchaseReturn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const state = useAppSelector((state) => state.purchaseReturns);

  const createPurchaseReturn = useCallback(
    async (payload: ICreatePurchaseReturnPayload) => {
      try {
        dispatch(createPurchaseReturnStart());

        const res = await purchaseReturnService.createPurchaseReturn(payload);

        dispatch(createPurchaseReturnSuccess(res));

        toast.success(res?.message || "Purchase return created");

        router.push("/dashboard/purchase-return");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create return";

        dispatch(createPurchaseReturnFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch, router],
  );

  const fetchPurchaseReturns = useCallback(
    async (page = 1, limit = 10) => {
      try {
        dispatch(fetchPurchaseReturnStart());

        const res = await purchaseReturnService.getPurchaseReturns(
          page,
          limit,
        );

        dispatch(fetchPurchaseReturnSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch returns";

        dispatch(fetchPurchaseReturnFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    createPurchaseReturn,
    fetchPurchaseReturns,
    ...state,
  };
};


