import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { toast } from "sonner";

import { productUnitService } from "../services/productUnit.service";

import {
  fetchUnitsStart,
  fetchUnitsSuccess,
  fetchUnitsFailure,
  createUnitStart,
  createUnitSuccess,
  createUnitFailure,
  fetchSingleUnitStart,
  fetchSingleUnitSuccess,
  fetchSingleUnitFailure,
  updateUnitStart,
  updateUnitSuccess,
  updateUnitFailure,
  deleteUnitStart,
  deleteUnitSuccess,
  deleteUnitFailure,
} from "../redux/features/product-unit/productUnitSlice";

import {
  ICreateProductUnitPayload,
  IUpdateProductUnitPayload,
} from "../types/productUnit.types";

export const useProductUnits = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.productUnits);

  /* ================= FETCH ================= */
  const fetchProductUnits = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchUnitsStart());

        const res = await productUnitService.getAllProductUnits({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchUnitsSuccess(res));
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch product units";

        dispatch(fetchUnitsFailure(message));
        toast.error(message);
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */
  const createProductUnit = useCallback(
    async (payload: ICreateProductUnitPayload) => {
      try {
        dispatch(createUnitStart());

        const res = await productUnitService.createProductUnitService(payload);

        dispatch(createUnitSuccess(res));

        toast.success("Product unit created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create product unit";

        dispatch(createUnitFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= SINGLE ================= */
  const fetchSingleProductUnit = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleUnitStart());

        const res = await productUnitService.getSingleProductUnitService(id);

        dispatch(fetchSingleUnitSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch product unit";

        dispatch(fetchSingleUnitFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */
  const updateProductUnit = useCallback(
    async (id: string, payload: IUpdateProductUnitPayload) => {
      try {
        dispatch(updateUnitStart());

        const res = await productUnitService.updateProductUnitService(
          id,
          payload,
        );

        dispatch(updateUnitSuccess(res));

        toast.success("Product unit updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update product unit";

        dispatch(updateUnitFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */
  const deleteProductUnit = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteUnitStart());

        const res = await productUnitService.deleteProductUnitService(id);

        dispatch(deleteUnitSuccess(id));

        toast.success(res?.message || "Product unit deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete product unit";

        dispatch(deleteUnitFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchProductUnits,
    createProductUnit,
    fetchSingleProductUnit,
    updateProductUnit,
    deleteProductUnit,

    ...state,
  };
};
