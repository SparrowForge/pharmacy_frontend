import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchPurchaseOrderPaymentStart,
  fetchPurchaseOrderPaymentSuccess,
  fetchPurchaseOrderPaymentFailure,
} from "@/src/redux/features/payments/purchaseOrderPaymentSlice";

import { purchaseOrderPaymentService } from "@/src/services/purchaseOrderPayment.service";
import { IPurchaseOrderPaymentRequest } from "@/src/types/purchaseOrderPayment.types";

export const usePurchaseOrderPayment = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.purhcaseOrderPayment);

  const addPayment = useCallback(
    async (poId: string, payload: IPurchaseOrderPaymentRequest) => {
      try {
        dispatch(fetchPurchaseOrderPaymentStart());

        const res =
          await purchaseOrderPaymentService.addPurchaseOrderPaymentService(
            poId,
            payload,
          );

        dispatch(fetchPurchaseOrderPaymentSuccess(res));

        toast.success("Payment added successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to add payment";

        dispatch(fetchPurchaseOrderPaymentFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    addPayment,
    ...state,
  };
};
