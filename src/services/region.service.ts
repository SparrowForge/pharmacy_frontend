
import axiosInstance from "./axios";

import {
  IRegion,
  IRegionResponse,
  ICreateRegionPayload,
  IDeleteRegionResponse,
  IGetRegionsQuery,
  IUpdateRegionPayload,
} from "@/src/types/region.types";

const getAllRegions = async (
  params: IGetRegionsQuery,
): Promise<IRegionResponse> => {
  const res = await axiosInstance.get<IRegionResponse>(
    "/regions",
    {
      params,
    },
  );

  return res.data;
};

const createRegionService = async (
  payload: ICreateRegionPayload,
): Promise<IRegion> => {
  const response = await axiosInstance.post(
    "/regions",
    payload,
  );

  return response.data;
};

const getSingleRegionService = async (
  id: string,
): Promise<IRegion> => {
  const response = await axiosInstance.get(`/regions/${id}`);

  return response.data;
};

const updateRegionService = async (
  id: string,
  payload: IUpdateRegionPayload,
): Promise<IRegion> => {
  const response = await axiosInstance.patch(
    `/regions/${id}`,
    payload,
  );

  return response.data;
};

const deleteRegionService = async (
  id: string,
): Promise<IDeleteRegionResponse> => {
  const response = await axiosInstance.delete(
    `/regions/${id}`,
  );

  return response.data;
};

export const regionService = {
  getAllRegions,
  createRegionService,
  getSingleRegionService,
  updateRegionService,
  deleteRegionService,
};