import axiosInstance from "./axios";
import { ICreateShopPayload, IGetShopsQuery, IShop, IShopResponse, IUpdateShopPayload } from "@/src/types/shop.types";

const getAllShops = async ( params: IGetShopsQuery): Promise<IShopResponse> => {
  const res = await axiosInstance.get<IShopResponse>("/shops",{
    params,
  });
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

const getSingleShopService = async (id: string): Promise<IShop> => {
  const response = await axiosInstance.get(`/shops/${id}`);
  return response.data;
};

const updateShopService = async (
  id: string,
  payload: IUpdateShopPayload,
) => {
  const response = await axiosInstance.patch(`/shops/${id}`, payload);
  return response.data;
};

export const shopService = {
  getAllShops,
  createShopService,
  getSingleShopService,
  updateShopService
};
