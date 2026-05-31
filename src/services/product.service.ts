import axiosInstance from "./axios";

import {
  IProduct,
  IProductResponse,
  ICreateProductPayload,
  IDeleteProductResponse,
  IGetProductsQuery,
  IUpdateProductPayload,
} from "@/src/types/product.types";

const getAllProducts = async (
  params: IGetProductsQuery,
): Promise<IProductResponse> => {
  const res = await axiosInstance.get<IProductResponse>("/products", {
    params,
  });

  return res.data;
};

const createProductService = async (
  payload: ICreateProductPayload,
): Promise<IProduct> => {
  const response = await axiosInstance.post("/products", payload);

  return response.data;
};

const getSingleProductService = async (id: string): Promise<IProduct> => {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;
};

const updateProductService = async (
  id: string,
  payload: IUpdateProductPayload,
): Promise<IProduct> => {
  const response = await axiosInstance.patch(`/products/${id}`, payload);

  return response.data;
};

const deleteProductService = async (
  id: string,
): Promise<IDeleteProductResponse> => {
  const response = await axiosInstance.delete(`/products/${id}`);

  return response.data;
};

export const productService = {
  getAllProducts,
  createProductService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
};
