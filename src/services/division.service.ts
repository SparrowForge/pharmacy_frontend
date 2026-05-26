// services/division.service.ts

import axiosInstance from "./axios";

import {
  IDivision,
  IDivisionResponse,
  ICreateDivisionPayload,
  IDeleteDivisionResponse,
  IGetDivisionsQuery,
  IUpdateDivisionPayload,
} from "@/src/types/division.types";

const getAllDivisions = async (
  params: IGetDivisionsQuery,
): Promise<IDivisionResponse> => {
  const res = await axiosInstance.get<IDivisionResponse>(
    "/divisions",
    {
      params,
    },
  );

  return res.data;
};

const createDivisionService = async (
  payload: ICreateDivisionPayload,
): Promise<IDivision> => {
  const response = await axiosInstance.post(
    "/divisions",
    payload,
  );

  return response.data;
};

const getSingleDivisionService = async (
  id: string,
): Promise<IDivision> => {
  const response = await axiosInstance.get(
    `/divisions/${id}`,
  );

  return response.data;
};

const updateDivisionService = async (
  id: string,
  payload: IUpdateDivisionPayload,
): Promise<IDivision> => {
  const response = await axiosInstance.patch(
    `/divisions/${id}`,
    payload,
  );

  return response.data;
};

const deleteDivisionService = async (
  id: string,
): Promise<IDeleteDivisionResponse> => {
  const response = await axiosInstance.delete(
    `/divisions/${id}`,
  );

  return response.data;
};

export const divisionService = {
  getAllDivisions,
  createDivisionService,
  getSingleDivisionService,
  updateDivisionService,
  deleteDivisionService,
};