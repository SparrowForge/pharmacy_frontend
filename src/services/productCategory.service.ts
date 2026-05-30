import axiosInstance from "./axios";

import {
  ICreateProductCategoryPayload,
  IUpdateProductCategoryPayload,
  IProductCategoryResponse,
  IProductCategory,
} from "@/src/types/productCategory.types";

/* GET ALL */
const getCategories = async (
  params?: any,
): Promise<IProductCategoryResponse> => {
  const res = await axiosInstance.get("/product_categories", {
    params,
  });

  return res.data;
};

/* CREATE */
const createCategory = async (
  payload: ICreateProductCategoryPayload,
): Promise<IProductCategory> => {
  const res = await axiosInstance.post("/product_categories", payload);

  return res.data;
};

/* SINGLE */
const getCategory = async (id: string): Promise<IProductCategory> => {
  const res = await axiosInstance.get(`/product_categories/${id}`);

  return res.data;
};

/* UPDATE */
const updateCategory = async (
  id: string,
  payload: IUpdateProductCategoryPayload,
): Promise<IProductCategory> => {
  const res = await axiosInstance.patch(`/product_categories/${id}`, payload);

  return res.data;
};

/* DELETE */
const deleteCategory = async (id: string) => {
  const res = await axiosInstance.delete(`/product_categories/${id}`);

  return res.data;
};

export const productCategoryService = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
