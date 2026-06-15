import { useCallback } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { productService } from "../services/product.service";

import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  fetchSingleProductStart,
  fetchSingleProductSuccess,
  fetchSingleProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} from "../redux/features/products/productSlice";

import {
  ICreateProductPayload,
  IUpdateProductPayload,
} from "../types/product.types";
import { useRouter } from "next/navigation";

export const useProducts = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const productState = useAppSelector((state) => state.products);

  const fetchProducts = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchProductsStart());

        const res = await productService.getAllProducts({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchProductsSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchProductsFailure(
            error?.response?.data?.message || "Failed to fetch products",
          ),
        );
      }
    },
    [dispatch],
  );

  const createProduct = useCallback(
    async (payload: ICreateProductPayload) => {
      try {
        dispatch(createProductStart());
        const res = await productService.createProductService(payload);
        dispatch(createProductSuccess(res));
        toast.success("Product created successfully");
        router.push("/dashboard/medicines")

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create product";

        dispatch(createProductFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  const fetchSingleProduct = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleProductStart());

        const res = await productService.getSingleProductService(id);

        dispatch(fetchSingleProductSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch product";

        dispatch(fetchSingleProductFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  const updateProduct = useCallback(
    async (id: string, payload: IUpdateProductPayload) => {
      try {
        dispatch(updateProductStart());

        const res = await productService.updateProductService(id, payload);

        dispatch(updateProductSuccess(res));

        toast.success("Product updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update product";

        dispatch(updateProductFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteProductStart());

        const res = await productService.deleteProductService(id);

        dispatch(deleteProductSuccess(id));

        toast.success(res?.message || "Product deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete product";

        dispatch(deleteProductFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchProducts,
    createProduct,
    fetchSingleProduct,
    updateProduct,
    deleteProduct,

    ...productState,
  };
};
