import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { productUnitService } from "@/src/services/productUnit.service";

import {
  fetchStart,
  fetchSuccess,
  fetchFail,
  createSuccess,
  updateSuccess,
  deleteSuccess,
} from "@/src/redux/features/product-unit/productUnit.slice";

export const useProductUnits = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.productUnits);

  /* FETCH */
  const fetchUnits = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchStart());

        const res = await productUnitService.getUnits({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(
          fetchSuccess({
            data: res.data,
            page: res.page,
            limit: res.limit,
            total: res.total,
          }),
        );
      } catch {
        dispatch(fetchFail("Failed to load units"));
      }
    },
    [dispatch],
  );

  const createUnit = useCallback(
    async (payload: any) => {
      const res = await productUnitService.createUnit(payload);
      dispatch(createSuccess(res));
      return res;
    },
    [dispatch],
  );

  const updateUnit = useCallback(
    async (id: string, payload: any) => {
      const res = await productUnitService.updateUnit(id, payload);
      dispatch(updateSuccess(res));
      return res;
    },
    [dispatch],
  );

  const deleteUnit = useCallback(
    async (id: string) => {
      await productUnitService.deleteUnit(id);
      dispatch(deleteSuccess(id));
    },
    [dispatch],
  );

  return {
    ...state,
    fetchUnits,
    createUnit,
    updateUnit,
    deleteUnit,
  };
};
