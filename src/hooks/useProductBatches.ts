import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { toast } from "sonner";

import { productBatchService } from "../services/productBatch.service";

import {
  fetchBatchesStart,
  fetchBatchesSuccess,
  fetchBatchesFailure,
  createBatchStart,
  createBatchSuccess,
  createBatchFailure,
  fetchSingleBatchStart,
  fetchSingleBatchSuccess,
  fetchSingleBatchFailure,
  updateBatchStart,
  updateBatchSuccess,
  updateBatchFailure,
  deleteBatchStart,
  deleteBatchSuccess,
  deleteBatchFailure,
} from "../redux/features/product-batch/productBatchSlice";

import {
  ICreateProductBatchPayload,
  IUpdateProductBatchPayload,
} from "../types/productBatch.types";

export const useProductBatches = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.productBatches);

  /* ================= FETCH LIST ================= */
  const fetchProductBatches = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchBatchesStart());

        const res = await productBatchService.getAllProductBatches({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchBatchesSuccess(res));
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch product batches";

        dispatch(fetchBatchesFailure(message));
        toast.error(message);
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */
  const createProductBatch = useCallback(
    async (payload: ICreateProductBatchPayload) => {
      try {
        dispatch(createBatchStart());

        const res =
          await productBatchService.createProductBatchService(payload);

        dispatch(createBatchSuccess(res));

        toast.success("Product batch created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create product batch";

        dispatch(createBatchFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= SINGLE ================= */
  const fetchSingleProductBatch = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleBatchStart());

        const res = await productBatchService.getSingleProductBatchService(id);

        dispatch(fetchSingleBatchSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch product batch";

        dispatch(fetchSingleBatchFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */
  const updateProductBatch = useCallback(
    async (id: string, payload: IUpdateProductBatchPayload) => {
      try {
        dispatch(updateBatchStart());

        const res = await productBatchService.updateProductBatchService(
          id,
          payload,
        );

        dispatch(updateBatchSuccess(res));

        toast.success("Product batch updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update product batch";

        dispatch(updateBatchFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */
  const deleteProductBatch = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteBatchStart());

        const res = await productBatchService.deleteProductBatchService(id);

        dispatch(deleteBatchSuccess(id));

        toast.success(res?.message || "Product batch deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete product batch";

        dispatch(deleteBatchFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchProductBatches,
    createProductBatch,
    fetchSingleProductBatch,
    updateProductBatch,
    deleteProductBatch,

    ...state,
  };
};
