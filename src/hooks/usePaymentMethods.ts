// hooks/usePaymentMethods.ts

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { paymentMethodService } from "../services/paymentMethod.service";

import {
  fetchPaymentMethodsStart,
  fetchPaymentMethodsSuccess,
  fetchPaymentMethodsFailure,
  createPaymentMethodStart,
  createPaymentMethodSuccess,
  createPaymentMethodFailure,
  fetchSinglePaymentMethodStart,
  fetchSinglePaymentMethodSuccess,
  fetchSinglePaymentMethodFailure,
  updatePaymentMethodStart,
  updatePaymentMethodSuccess,
  updatePaymentMethodFailure,
  deletePaymentMethodStart,
  deletePaymentMethodSuccess,
  deletePaymentMethodFailure,
} from "../redux/features/payment-methods/paymentMethodSlice";

import {
  ICreatePaymentMethodPayload,
  IUpdatePaymentMethodPayload,
} from "../types/paymentMethod.types";

export const usePaymentMethods = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.paymentMethods);

  /* ================= FETCH ALL ================= */

  const fetchPaymentMethods = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchPaymentMethodsStart());

        const res = await paymentMethodService.getAllPaymentMethods({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchPaymentMethodsSuccess(res));
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch payment methods";

        dispatch(fetchPaymentMethodsFailure(message));

        toast.error(message);
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createPaymentMethod = useCallback(
    async (payload: ICreatePaymentMethodPayload) => {
      try {
        dispatch(createPaymentMethodStart());

        const res =
          await paymentMethodService.createPaymentMethodService(payload);

        dispatch(createPaymentMethodSuccess(res));

        toast.success("Payment method created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create payment method";

        dispatch(createPaymentMethodFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= SINGLE ================= */

  const fetchSinglePaymentMethod = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSinglePaymentMethodStart());

        const res =
          await paymentMethodService.getSinglePaymentMethodService(id);

        dispatch(fetchSinglePaymentMethodSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch payment method";

        dispatch(fetchSinglePaymentMethodFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updatePaymentMethod = useCallback(
    async (id: string, payload: IUpdatePaymentMethodPayload) => {
      try {
        dispatch(updatePaymentMethodStart());

        const res = await paymentMethodService.updatePaymentMethodService(
          id,
          payload,
        );

        dispatch(updatePaymentMethodSuccess(res));

        toast.success("Payment method updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update payment method";

        dispatch(updatePaymentMethodFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deletePaymentMethod = useCallback(
    async (id: string) => {
      try {
        dispatch(deletePaymentMethodStart());

        const res = await paymentMethodService.deletePaymentMethodService(id);

        dispatch(deletePaymentMethodSuccess(id));

        toast.success(res?.message || "Payment method deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete payment method";

        dispatch(deletePaymentMethodFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchPaymentMethods,
    createPaymentMethod,
    fetchSinglePaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,

    ...state,
  };
};
