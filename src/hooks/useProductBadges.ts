import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  setProductBadges,
  setSingleProductBadge,
  setFetchLoading,
  setCreateLoading,
  setUpdateLoading,
  setDeleteLoading,
} from "@/src/redux/features/product-badge/productBadge.slice";

import { productBadgeService } from "@/src/services/productBadge.service";

import {
  ICreateProductBadgePayload,
  IGetProductBadgesQuery,
  IUpdateProductBadgePayload,
} from "@/src/types/productBadge.types";

export const useProductBadges = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.productBadge);

  const fetchProductBadges = useCallback(
    async (params?: IGetProductBadgesQuery) => {
      dispatch(setFetchLoading(true));

      try {
        const res = await productBadgeService.getAllProductBadges(params || {});

        dispatch(setProductBadges(res.data));
      } finally {
        dispatch(setFetchLoading(false));
      }
    },
    [dispatch],
  );

  const getSingleProductBadge = useCallback(
    async (id: string) => {
      const res = await productBadgeService.getSingleProductBadge(id);

      dispatch(setSingleProductBadge(res));

      return res;
    },
    [dispatch],
  );

  const createProductBadge = useCallback(
    async (payload: ICreateProductBadgePayload) => {
      dispatch(setCreateLoading(true));

      try {
        return await productBadgeService.createProductBadge(payload);
      } finally {
        dispatch(setCreateLoading(false));
      }
    },
    [dispatch],
  );

  const updateProductBadge = useCallback(
    async (id: string, payload: IUpdateProductBadgePayload) => {
      dispatch(setUpdateLoading(true));

      try {
        return await productBadgeService.updateProductBadge(id, payload);
      } finally {
        dispatch(setUpdateLoading(false));
      }
    },
    [dispatch],
  );

  const deleteProductBadge = useCallback(
    async (id: string) => {
      dispatch(setDeleteLoading(true));

      try {
        await productBadgeService.deleteProductBadge(id);

        toast.success("Product badge deleted successfully");

        await fetchProductBadges();
      } catch {
        toast.error("Failed to delete product badge");
      } finally {
        dispatch(setDeleteLoading(false));
      }
    },
    [dispatch, fetchProductBadges],
  );

  return {
    ...state,

    fetchProductBadges,
    getSingleProductBadge,
    createProductBadge,
    updateProductBadge,
    deleteProductBadge,
  };
};
