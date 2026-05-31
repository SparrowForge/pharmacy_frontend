import {
  ICreateProductImage,
  IGetProductImageQuery,
  IProductImage,
  IProductImageResponse,
} from "../types/productImage.types";
import axiosInstance from "./axios";

export const productImageService = {
  getAll: async (
    params: IGetProductImageQuery,
  ): Promise<IProductImageResponse> => {
    const res = await axiosInstance.get("/product_images", { params });
    return res.data;
  },

  getSingle: async (id: string): Promise<IProductImage> => {
    const res = await axiosInstance.get(`/product_images/${id}`);
    return res.data;
  },

  create: async (payload: ICreateProductImage): Promise<IProductImage> => {
    const res = await axiosInstance.post("/product_images", payload);
    return res.data;
  },

  update: async (
    id: string,
    payload: ICreateProductImage,
  ): Promise<IProductImage> => {
    const res = await axiosInstance.patch(`/product_images/${id}`, payload);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/product_images/${id}`);
  },
};
