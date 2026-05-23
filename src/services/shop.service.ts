import axiosInstance from "./axios";
import { IShopResponse } from "@/src/types/shop.types";

const getAllShops = async (): Promise<IShopResponse> => {
  const res = await axiosInstance.get<IShopResponse>("/shops");
  return res.data;
};

export const shopService = {
  getAllShops,
};
