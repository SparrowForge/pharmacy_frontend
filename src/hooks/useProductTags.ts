import { useAppDispatch } from "@/src/redux/hooks";
import { toast } from "sonner";

import { productTagService } from "../services/productTag.service";
import {
  fetchProductTagsStart,
  fetchProductTagsSuccess,
  fetchProductTagsFail,
  createProductTagStart,
  createProductTagSuccess,
  createProductTagFail,
  updateProductTagStart,
  updateProductTagSuccess,
  updateProductTagFail,
  deleteProductTagStart,
  deleteProductTagSuccess,
  deleteProductTagFail,
  setSingleProductTag,
  clearSingleProductTag,
} from "../redux/features/product-tag/productTag.slice";

import {
  ICreateProductTagPayload,
  IGetProductTagsQuery,
} from "../types/productTag.types";

export const useProductTags = () => {
  const dispatch = useAppDispatch();

  /* GET ALL */
  const fetchProductTags = async (params: IGetProductTagsQuery) => {
    try {
      dispatch(fetchProductTagsStart());

      const res = await productTagService.getAll(params);

      dispatch(fetchProductTagsSuccess(res));
    } catch (err) {
      dispatch(fetchProductTagsFail());
      toast.error("Failed to fetch product tags");
    }
  };

  /* GET SINGLE */
  const fetchSingleProductTag = async (id: string) => {
    try {
      const res = await productTagService.getSingle(id);

      dispatch(setSingleProductTag(res));

      return res;
    } catch (err) {
      toast.error("Failed to fetch product tag");
    }
  };

  /* CREATE */
  const createProductTag = async (payload: ICreateProductTagPayload) => {
    try {
      dispatch(createProductTagStart());

      await productTagService.create(payload);

      dispatch(createProductTagSuccess());

      toast.success("Product tag created successfully");
    } catch (err) {
      dispatch(createProductTagFail());
      toast.error("Failed to create product tag");
    }
  };

  /* UPDATE */
  const updateProductTag = async (
    id: string,
    payload: ICreateProductTagPayload,
  ) => {
    try {
      dispatch(updateProductTagStart());

      await productTagService.update(id, payload);

      dispatch(updateProductTagSuccess());

      toast.success("Product tag updated successfully");
    } catch (err) {
      dispatch(updateProductTagFail());
      toast.error("Failed to update product tag");
    }
  };

  /* DELETE */
  const deleteProductTag = async (id: string) => {
    try {
      dispatch(deleteProductTagStart());

      await productTagService.remove(id);

      dispatch(deleteProductTagSuccess());

      toast.success("Product tag deleted successfully");
    } catch (err) {
      dispatch(deleteProductTagFail());
      toast.error("Failed to delete product tag");
    }
  };

  /* CLEAR SINGLE */
  const clearProductTag = () => {
    dispatch(clearSingleProductTag());
  };

  return {
    fetchProductTags,
    fetchSingleProductTag,
    createProductTag,
    updateProductTag,
    deleteProductTag,
    clearProductTag,
  };
};
