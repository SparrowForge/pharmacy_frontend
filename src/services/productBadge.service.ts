
import {
  ICreateProductBadgePayload,
  IGetProductBadgesQuery,
  IProductBadge,
  IProductBadgeResponse,
  IUpdateProductBadgePayload,
} from "@/src/types/productBadge.types";
import axiosInstance from "./axios";

const createProductBadge = async (
  payload: ICreateProductBadgePayload,
): Promise<IProductBadge> => {
  const res = await axiosInstance.post("/product_badges", payload);

  return res.data;
};

const getAllProductBadges = async (
  params: IGetProductBadgesQuery,
): Promise<IProductBadgeResponse> => {
  const res = await axiosInstance.get("/product_badges", {
    params,
  });

  return res.data;
};

const getSingleProductBadge = async (id: string): Promise<IProductBadge> => {
  const res = await axiosInstance.get(`/product_badges/${id}`);

  return res.data;
};

const updateProductBadge = async (
  id: string,
  payload: IUpdateProductBadgePayload,
): Promise<IProductBadge> => {
  const res = await axiosInstance.patch(`/product_badges/${id}`, payload);

  return res.data;
};

const deleteProductBadge = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/product_badges/${id}`);
};

export const productBadgeService = {
  createProductBadge,
  getAllProductBadges,
  getSingleProductBadge,
  updateProductBadge,
  deleteProductBadge,
};
