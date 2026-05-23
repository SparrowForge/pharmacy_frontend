import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  fetchShopsFailure,
  fetchShopsStart,
  fetchShopsSuccess,
} from "../redux/features/shops/shopSlice";
import { shopService } from "../services/shop.service";

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
    ...memoizedState,
  };
};
