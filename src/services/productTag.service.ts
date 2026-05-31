
import {
  ICreateProductTagPayload,
  IGetProductTagsQuery,
  IProductTagResponse,
} from "../types/productTag.types";
import axiosInstance from "./axios";

export const productTagService = {
  getAll: async (
    params: IGetProductTagsQuery,
  ): Promise<IProductTagResponse> => {
    const res = await axiosInstance.get("/product_tags", { params });
    return res.data;
  },

  getSingle: async (id: string) => {
    const res = await axiosInstance.get(`/product_tags/${id}`);
    return res.data;
  },

  create: async (payload: ICreateProductTagPayload) => {
    const res = await axiosInstance.post("/product_tags", payload);
    return res.data;
  },

  update: async (id: string, payload: ICreateProductTagPayload) => {
    const res = await axiosInstance.patch(`/product_tags/${id}`, payload);
    return res.data;
  },

  remove: async (id: string) => {
    const res = await axiosInstance.delete(`/product_tags/${id}`);
    return res.data;
  },
};