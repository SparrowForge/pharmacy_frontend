// hooks/useDiscountCodes.ts

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { discountCodeService } from "../services/discountCode.service";

import {
  fetchDiscountCodesStart,
  fetchDiscountCodesSuccess,
  fetchDiscountCodesFailure,

  createDiscountCodeStart,
  createDiscountCodeSuccess,
  createDiscountCodeFailure,

  fetchSingleDiscountCodeStart,
  fetchSingleDiscountCodeSuccess,
  fetchSingleDiscountCodeFailure,

  updateDiscountCodeStart,
  updateDiscountCodeSuccess,
  updateDiscountCodeFailure,

  deleteDiscountCodeStart,
  deleteDiscountCodeSuccess,
  deleteDiscountCodeFailure,
} from "../redux/features/discount-codes/discountCodeSlice";

import {
  ICreateDiscountCodePayload,
  IUpdateDiscountCodePayload,
} from "../types/discountCode.types";

export const useDiscountCodes = () => {
  const dispatch = useAppDispatch();

  const discountState = useAppSelector(
    (state) => state.discountCodes,
  );

  /* ================= FETCH ALL ================= */

  const fetchDiscountCodes = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchDiscountCodesStart());

        const res = await discountCodeService.getAllDiscountCodes({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchDiscountCodesSuccess(res));
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch discount codes";

        dispatch(fetchDiscountCodesFailure(message));

        toast.error(message);
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createDiscountCode = useCallback(
    async (payload: ICreateDiscountCodePayload) => {
      try {
        dispatch(createDiscountCodeStart());

        const res =
          await discountCodeService.createDiscountCodeService(
            payload,
          );

        dispatch(createDiscountCodeSuccess(res));

        toast.success("Discount code created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to create discount code";

        dispatch(createDiscountCodeFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= SINGLE ================= */

  const fetchSingleDiscountCode = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleDiscountCodeStart());

        const res =
          await discountCodeService.getSingleDiscountCodeService(
            id,
          );

        dispatch(fetchSingleDiscountCodeSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch discount code";

        dispatch(fetchSingleDiscountCodeFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateDiscountCode = useCallback(
    async (
      id: string,
      payload: IUpdateDiscountCodePayload,
    ) => {
      try {
        dispatch(updateDiscountCodeStart());

        const res =
          await discountCodeService.updateDiscountCodeService(
            id,
            payload,
          );

        dispatch(updateDiscountCodeSuccess(res));

        toast.success("Discount code updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to update discount code";

        dispatch(updateDiscountCodeFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteDiscountCode = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteDiscountCodeStart());

        const res =
          await discountCodeService.deleteDiscountCodeService(
            id,
          );

        dispatch(deleteDiscountCodeSuccess(id));

        toast.success(
          res?.message || "Discount code deleted successfully",
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to delete discount code";

        dispatch(deleteDiscountCodeFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchDiscountCodes,
    createDiscountCode,
    fetchSingleDiscountCode,
    updateDiscountCode,
    deleteDiscountCode,

    ...discountState,
  };
};