import axiosInstance from "./axios";

import {
  ICreateProductBatchPayload,
  IDeleteProductBatchResponse,
  IGetProductBatchesQuery,
  IProductBatch,
  IProductBatchResponse,
  IUpdateProductBatchPayload,
} from "@/src/types/productBatch.types";

/* ================= GET ALL ================= */
const getAllProductBatches = async (
  params: IGetProductBatchesQuery,
): Promise<IProductBatchResponse> => {
  const res = await axiosInstance.get<IProductBatchResponse>(
    "/product_batches",
    { params },
  );

  return res.data;
};

/* ================= CREATE ================= */
const createProductBatchService = async (
  payload: ICreateProductBatchPayload,
): Promise<IProductBatch> => {
  const res = await axiosInstance.post<IProductBatch>(
    "/product_batches",
    payload,
  );

  return res.data;
};

/* ================= SINGLE ================= */
const getSingleProductBatchService = async (
  id: string,
): Promise<IProductBatch> => {
  const res = await axiosInstance.get<IProductBatch>(`/product_batches/${id}`);

  return res.data;
};

/* ================= UPDATE ================= */
const updateProductBatchService = async (
  id: string,
  payload: IUpdateProductBatchPayload,
): Promise<IProductBatch> => {
  const res = await axiosInstance.patch<IProductBatch>(
    `/product_batches/${id}`,
    payload,
  );

  return res.data;
};

/* ================= DELETE ================= */
const deleteProductBatchService = async (
  id: string,
): Promise<IDeleteProductBatchResponse> => {
  const res = await axiosInstance.delete<IDeleteProductBatchResponse>(
    `/product_batches/${id}`,
  );

  return res.data;
};

export const productBatchService = {
  getAllProductBatches,
  createProductBatchService,
  getSingleProductBatchService,
  updateProductBatchService,
  deleteProductBatchService,
};
