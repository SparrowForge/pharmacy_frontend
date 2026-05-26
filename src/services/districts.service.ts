// services/district.service.ts

import axiosInstance from "./axios";

import {
  IDistrict,
  IDistrictResponse,
  ICreateDistrictPayload,
  IDeleteDistrictResponse,
  IGetDistrictsQuery,
  IUpdateDistrictPayload,
} from "@/src/types/districts.types";

const getAllDistricts = async (
  params: IGetDistrictsQuery,
): Promise<IDistrictResponse> => {
  const res = await axiosInstance.get<IDistrictResponse>(
    "/districts",
    {
      params,
    },
  );

  return res.data;
};

const createDistrictService = async (
  payload: ICreateDistrictPayload,
): Promise<IDistrict> => {
  const response = await axiosInstance.post(
    "/districts",
    payload,
  );

  return response.data;
};

const getSingleDistrictService = async (
  id: string,
): Promise<IDistrict> => {
  const response = await axiosInstance.get(
    `/districts/${id}`,
  );

  return response.data;
};

const updateDistrictService = async (
  id: string,
  payload: IUpdateDistrictPayload,
): Promise<IDistrict> => {
  const response = await axiosInstance.patch(
    `/districts/${id}`,
    payload,
  );

  return response.data;
};

const deleteDistrictService = async (
  id: string,
): Promise<IDeleteDistrictResponse> => {
  const response = await axiosInstance.delete(
    `/districts/${id}`,
  );

  return response.data;
};

export const districtService = {
  getAllDistricts,
  createDistrictService,
  getSingleDistrictService,
  updateDistrictService,
  deleteDistrictService,
};