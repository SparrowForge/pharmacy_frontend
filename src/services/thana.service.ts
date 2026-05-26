// services/thana.service.ts

import axiosInstance from "./axios";

import {
  IThana,
  IThanaResponse,
  ICreateThanaPayload,
  IDeleteThanaResponse,
  IGetThanasQuery,
  IUpdateThanaPayload,
} from "@/src/types/thana.types";

const getAllThanas = async (
  params: IGetThanasQuery,
): Promise<IThanaResponse> => {
  const res = await axiosInstance.get<IThanaResponse>(
    "/thanas",
    {
      params,
    },
  );

  return res.data;
};

const createThanaService = async (
  payload: ICreateThanaPayload,
): Promise<IThana> => {
  const response = await axiosInstance.post(
    "/thanas",
    payload,
  );

  return response.data;
};

const getSingleThanaService = async (
  id: string,
): Promise<IThana> => {
  const response = await axiosInstance.get(`/thanas/${id}`);

  return response.data;
};

const updateThanaService = async (
  id: string,
  payload: IUpdateThanaPayload,
): Promise<IThana> => {
  const response = await axiosInstance.patch(
    `/thanas/${id}`,
    payload,
  );

  return response.data;
};

const deleteThanaService = async (
  id: string,
): Promise<IDeleteThanaResponse> => {
  const response = await axiosInstance.delete(
    `/thanas/${id}`,
  );

  return response.data;
};

export const thanaService = {
  getAllThanas,
  createThanaService,
  getSingleThanaService,
  updateThanaService,
  deleteThanaService,
};