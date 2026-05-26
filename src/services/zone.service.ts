// services/zone.service.ts

import axiosInstance from "./axios";

import {
  IZone,
  IZoneResponse,
  ICreateZonePayload,
  IDeleteZoneResponse,
  IGetZonesQuery,
  IUpdateZonePayload,
} from "@/src/types/zone.types";

const getAllZones = async (params: IGetZonesQuery): Promise<IZoneResponse> => {
  const res = await axiosInstance.get<IZoneResponse>("/zones", {
    params,
  });

  return res.data;
};

const createZoneService = async (
  payload: ICreateZonePayload,
): Promise<IZone> => {
  const response = await axiosInstance.post("/zones", payload);

  return response.data;
};

const getSingleZoneService = async (id: string): Promise<IZone> => {
  const response = await axiosInstance.get(`/zones/${id}`);

  return response.data;
};

const updateZoneService = async (
  id: string,
  payload: IUpdateZonePayload,
): Promise<IZone> => {
  const response = await axiosInstance.patch(`/zones/${id}`, payload);

  return response.data;
};

const deleteZoneService = async (id: string): Promise<IDeleteZoneResponse> => {
  const response = await axiosInstance.delete(`/zones/${id}`);

  return response.data;
};

export const zoneService = {
  getAllZones,
  createZoneService,
  getSingleZoneService,
  updateZoneService,
  deleteZoneService,
};
