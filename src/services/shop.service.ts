import axiosInstance from "./axios";
import { ICreateShopPayload, IShop, IShopResponse } from "@/src/types/shop.types";

const getAllShops = async (): Promise<IShopResponse> => {
  const res = await axiosInstance.get<IShopResponse>("/shops");
  return res.data;
};

const createShopService = async (
  payload: ICreateShopPayload
): Promise<IShop> => {
  const response = await axiosInstance.post(
    "/shops",
    payload
  );

  return response.data;
};

export const shopService = {
  getAllShops,
  createShopService
};
