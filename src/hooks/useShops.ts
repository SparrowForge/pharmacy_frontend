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
} from "../redux/features/shops/shopSlice";

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
            error?.response?.data?.message || "Failed to fetch shops"
          )
        );
      }
    },
    [dispatch]
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
    [dispatch]
  );

  return {
    fetchShops,
    createShop,

    ...shopState,
  };
};