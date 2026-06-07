
import { useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { purchaseReturnService } from "@/src/services/purchaseReturn.service";

import {
  createPurchaseReturnStart,
  createPurchaseReturnSuccess,
  createPurchaseReturnFailure,
  fetchPurchaseReturnsStart,
  fetchPurchaseReturnsSuccess,
  fetchPurchaseReturnsFailure,
} from "@/src/redux/features/purchase-order/purchaseReturnSlice";

import { ICreatePurchaseReturnPayload, IGetPurchaseReturnParams } from "@/src/types/purchaseReturn.types";

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

        toast.success(res?.data &&  "Purchase return created");

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
    async (params?: IGetPurchaseReturnParams) => {
      try {
        dispatch(fetchPurchaseReturnsStart());

        const query = params || state.filters;

        const res = await purchaseReturnService.getPurchaseReturnsService(query);

        dispatch(
          fetchPurchaseReturnsSuccess({
            data: res.data,
            page: res.page,
            limit: res.limit,
            total: res.total,
          }),
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch purchase returns";

        dispatch(fetchPurchaseReturnsFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch, state.filters],
  );

  return {
    createPurchaseReturn,
    fetchPurchaseReturns,
    ...state,
  };
};


