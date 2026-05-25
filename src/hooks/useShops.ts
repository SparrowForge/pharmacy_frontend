import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  createShopFailure,
  createShopStart,
  createShopSuccess,
  fetchShopsFailure,
  fetchShopsStart,
  fetchShopsSuccess,
} from "../redux/features/shops/shopSlice";
import { shopService } from "../services/shop.service";
import { ICreateShopPayload } from "../types/shop.types";
import { toast } from "sonner";

export const useShops = () => {
  const dispatch = useAppDispatch();
  const shopState = useAppSelector((state) => state.shops);
  const fetchShops = useCallback(async () => {
    try {
      dispatch(fetchShopsStart());
      const res = await shopService.getAllShops();
      dispatch(fetchShopsSuccess(res.data));
    } catch (error: any) {
      dispatch(
        fetchShopsFailure(
          error?.response?.data?.message || "Failed to fetch shops",
        ),
      );
    }
  }, [dispatch]);

  const createShop = useCallback(
    async (payload: ICreateShopPayload) => {
      try {
        dispatch(createShopStart());
        const response = await shopService.createShopService(payload);
        dispatch(createShopSuccess(response));
        toast.success("Shop created successfully");
        return response;
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

  const memoizedState = useMemo(
    () => ({
      shops: shopState.shops,
      loading: shopState.loading,
      error: shopState.error,
    }),
    [shopState],
  );

  return {
    fetchShops,

    createShop,
    ...memoizedState,
  };
};
