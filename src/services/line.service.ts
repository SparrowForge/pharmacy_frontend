import axiosInstance from "./axios";

import {
  ILine,
  ILineResponse,
  ICreateLinePayload,
  IDeleteLineResponse,
  IGetLinesQuery,
  IUpdateLinePayload,
} from "@/src/types/line.types";

const getAllLines = async (params: IGetLinesQuery): Promise<ILineResponse> => {
  const res = await axiosInstance.get<ILineResponse>("/lines", {
    params,
  });

  return res.data;
};

const createLineService = async (
  payload: ICreateLinePayload,
): Promise<ILine> => {
  const response = await axiosInstance.post("/lines", payload);

  return response.data;
};

const getSingleLineService = async (id: string): Promise<ILine> => {
  const response = await axiosInstance.get(`/lines/${id}`);

  return response.data;
};

const updateLineService = async (
  id: string,
  payload: IUpdateLinePayload,
): Promise<ILine> => {
  const response = await axiosInstance.patch(`/lines/${id}`, payload);

  return response.data;
};

const deleteLineService = async (id: string): Promise<IDeleteLineResponse> => {
  const response = await axiosInstance.delete(`/lines/${id}`);

  return response.data;
};

export const lineService = {
  getAllLines,
  createLineService,
  getSingleLineService,
  updateLineService,
  deleteLineService,
};
