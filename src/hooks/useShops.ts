import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { shopService } from "../services/shop.service";
import { toast } from "sonner";

import {
  fetchShopsStart,
  fetchShopsSuccess,
  fetchShopsFailure,
  createShopStart,
  createShopSuccess,
  createShopFailure,
  fetchSingleShopStart,
  fetchSingleShopSuccess,
  fetchSingleShopFailure,
  updateShopStart,
  updateShopSuccess,
  updateShopFailure,
  deleteShopStart,
  deleteShopSuccess,
  deleteShopFailure,
} from "../redux/features/shops/shopSlice";
import { IUpdateShopPayload } from "../types/shop.types";

export const useShops = () => {
  const dispatch = useAppDispatch();
  const shopState = useAppSelector((state) => state.shops);

  /* ================= FETCH ================= */
  const fetchShops = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchShopsStart());

        const res = await shopService.getAllShops({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchShopsSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchShopsFailure(
            error?.response?.data?.message || "Failed to fetch shops",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */
  const createShop = useCallback(
    async (payload: any) => {
      try {
        dispatch(createShopStart());

        const res = await shopService.createShopService(payload);

        dispatch(createShopSuccess(res));

        toast.success("Shop created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create shop";

        dispatch(createShopFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */
  const fetchSingleShop = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleShopStart());
        const res = await shopService.getSingleShopService(id);
        dispatch(fetchSingleShopSuccess(res));
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch shop";
        dispatch(fetchSingleShopFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE SINGLE ================= */
  const updateShop = useCallback(
    async (id: string, payload: IUpdateShopPayload) => {
      try {
        dispatch(updateShopStart());
        const res = await shopService.updateShopService(id, payload);
        dispatch(updateShopSuccess(res));
        toast.success("Shop updated successfully");
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update shop";
        dispatch(updateShopFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE SINGLE ================= */
  const deleteShop = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteShopStart());
        const res = await shopService.deleteShopService(id);
        dispatch(deleteShopSuccess(id));
        toast.success(res?.message || "Shop deleted successfully");
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete shop";
        dispatch(deleteShopFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchShops,
    createShop,
    fetchSingleShop,
    updateShop,
    deleteShop,

    ...shopState,
  };
};
