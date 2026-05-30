import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { toast } from "sonner";

import { productCategoryService } from "@/src/services/productCategory.service";

import {
  fetchStart,
  fetchSuccess,
  fetchFail,
  createStart,
  createSuccess,
  createFail,
  singleStart,
  singleSuccess,
  singleFail,
  updateStart,
  updateSuccess,
  updateFail,
  deleteStart,
  deleteSuccess,
  deleteFail,
} from "@/src/redux/features/product-category/productCategory.slice";

export const useProductCategories = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.productCategories);

  const fetchCategories = useCallback(
    async (params?: any) => {
      try {
        dispatch(fetchStart());

        const res = await productCategoryService.getCategories(params);

        dispatch(fetchSuccess(res));
      } catch (err: any) {
        dispatch(fetchFail("Failed to load categories"));
      }
    },
    [dispatch],
  );

  const createCategory = useCallback(
    async (payload: any) => {
      try {
        dispatch(createStart());

        const res = await productCategoryService.createCategory(payload);

        dispatch(createSuccess(res));

        toast.success("Category created");

        return res;
      } catch (err: any) {
        dispatch(createFail("Create failed"));
        toast.error("Create failed");
        throw err;
      }
    },
    [dispatch],
  );

  const fetchSingleCategory = useCallback(
    async (id: string) => {
      try {
        dispatch(singleStart());

        const res = await productCategoryService.getCategory(id);

        dispatch(singleSuccess(res));

        return res;
      } catch {
        dispatch(singleFail("Failed to fetch"));
        throw new Error();
      }
    },
    [dispatch],
  );

  const updateCategory = useCallback(
    async (id: string, payload: any) => {
      try {
        dispatch(updateStart());

        const res = await productCategoryService.updateCategory(id, payload);

        dispatch(updateSuccess(res));

        toast.success("Updated");

        return res;
      } catch {
        dispatch(updateFail("Update failed"));
        throw new Error();
      }
    },
    [dispatch],
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteStart());

        await productCategoryService.deleteCategory(id);

        dispatch(deleteSuccess(id));

        toast.success("Deleted");
      } catch {
        dispatch(deleteFail("Delete failed"));
      }
    },
    [dispatch],
  );

  return {
    ...state,

    fetchCategories,
    createCategory,
    fetchSingleCategory,
    updateCategory,
    deleteCategory,
  };
};
