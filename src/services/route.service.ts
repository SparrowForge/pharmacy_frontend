// services/route.service.ts

import axiosInstance from "./axios";

import {
  IRoute,
  IRouteResponse,
  ICreateRoutePayload,
  IDeleteRouteResponse,
  IGetRoutesQuery,
  IUpdateRoutePayload,
} from "@/src/types/route.types";

const getAllRoutes = async (
  params: IGetRoutesQuery,
): Promise<IRouteResponse> => {
  const res = await axiosInstance.get<IRouteResponse>("/routes", {
    params,
  });

  return res.data;
};

const createRouteService = async (
  payload: ICreateRoutePayload,
): Promise<IRoute> => {
  const response = await axiosInstance.post("/routes", payload);

  return response.data;
};

const getSingleRouteService = async (id: string): Promise<IRoute> => {
  const response = await axiosInstance.get(`/routes/${id}`);

  return response.data;
};

const updateRouteService = async (
  id: string,
  payload: IUpdateRoutePayload,
): Promise<IRoute> => {
  const response = await axiosInstance.patch(`/routes/${id}`, payload);

  return response.data;
};

const deleteRouteService = async (
  id: string,
): Promise<IDeleteRouteResponse> => {
  const response = await axiosInstance.delete(`/routes/${id}`);

  return response.data;
};

export const routeService = {
  getAllRoutes,
  createRouteService,
  getSingleRouteService,
  updateRouteService,
  deleteRouteService,
};
