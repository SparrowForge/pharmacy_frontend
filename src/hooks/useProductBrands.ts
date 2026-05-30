import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { toast } from "sonner";

import { productBrandService } from "@/src/services/productBrand.service";
import {
  fetchBrandsStart,
  fetchBrandsSuccess,
  fetchBrandsFailure,
  createBrandStart,
  createBrandSuccess,
  createBrandFailure,
  fetchSingleBrandStart,
  fetchSingleBrandSuccess,
  fetchSingleBrandFailure,
  updateBrandStart,
  updateBrandSuccess,
  updateBrandFailure,
  deleteBrandStart,
  deleteBrandSuccess,
  deleteBrandFailure,
} from "@/src/redux/features/product-brand/productBrandSlice";

import { IUpdateProductBrandPayload } from "@/src/types/productBrand.types";

export const useProductBrands = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.productBrand);

  /* FETCH ALL */
  const fetchBrands = useCallback(
    async (params?: any) => {
      try {
        dispatch(fetchBrandsStart());

        const res = await productBrandService.getAllProductBrands({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchBrandsSuccess(res));
      } catch (err: any) {
        dispatch(
          fetchBrandsFailure(
            err?.response?.data?.message || "Failed to fetch brands",
          ),
        );
      }
    },
    [dispatch],
  );

  /* CREATE */
  const createBrand = useCallback(
    async (payload: any) => {
      try {
        dispatch(createBrandStart());

        const res = await productBrandService.createProductBrand(payload);

        dispatch(createBrandSuccess(res));

        toast.success("Brand created successfully");

        return res;
      } catch (err: any) {
        const msg = err?.response?.data?.message || "Failed to create brand";

        dispatch(createBrandFailure(msg));
        toast.error(msg);

        throw err;
      }
    },
    [dispatch],
  );

  /* SINGLE */
  const fetchSingleBrand = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleBrandStart());

        const res = await productBrandService.getSingleProductBrand(id);

        dispatch(fetchSingleBrandSuccess(res));

        return res;
      } catch (err: any) {
        const msg = err?.response?.data?.message || "Failed to fetch brand";

        dispatch(fetchSingleBrandFailure(msg));
        toast.error(msg);

        throw err;
      }
    },
    [dispatch],
  );

  /* UPDATE */
  const updateBrand = useCallback(
    async (id: string, payload: IUpdateProductBrandPayload) => {
      try {
        dispatch(updateBrandStart());

        const res = await productBrandService.updateProductBrand(id, payload);

        dispatch(updateBrandSuccess(res));

        toast.success("Brand updated successfully");

        return res;
      } catch (err: any) {
        const msg = err?.response?.data?.message || "Failed to update brand";

        dispatch(updateBrandFailure(msg));
        toast.error(msg);

        throw err;
      }
    },
    [dispatch],
  );

  /* DELETE */
  const deleteBrand = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteBrandStart());

        const res = await productBrandService.deleteProductBrand(id);

        dispatch(deleteBrandSuccess(id));

        toast.success(res?.message || "Brand deleted");

        return res;
      } catch (err: any) {
        const msg = err?.response?.data?.message || "Failed to delete brand";

        dispatch(deleteBrandFailure(msg));
        toast.error(msg);

        throw err;
      }
    },
    [dispatch],
  );

  return {
    ...state,
    fetchBrands,
    createBrand,
    fetchSingleBrand,
    updateBrand,
    deleteBrand,
  };
};
