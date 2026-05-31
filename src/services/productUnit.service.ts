import axiosInstance from "./axios";

import {
  ICreateProductUnitPayload,
  IUpdateProductUnitPayload,
  IProductUnit,
  IProductUnitResponse,
  IGetProductUnitsQuery,
} from "@/src/types/productUnit.types";

/* ================= GET ALL ================= */
const getAllProductUnits = async (
  params: IGetProductUnitsQuery
): Promise<IProductUnitResponse> => {
  const res = await axiosInstance.get<IProductUnitResponse>(
    "/product_units",
    { params }
  );

  return res.data;
};

/* ================= CREATE ================= */
const createProductUnitService = async (
  payload: ICreateProductUnitPayload
): Promise<IProductUnit> => {
  const res = await axiosInstance.post("/product_units", payload);
  return res.data;
};

/* ================= SINGLE ================= */
const getSingleProductUnitService = async (
  id: string
): Promise<IProductUnit> => {
  const res = await axiosInstance.get(`/product_units/${id}`);
  return res.data;
};

/* ================= UPDATE ================= */
const updateProductUnitService = async (
  id: string,
  payload: IUpdateProductUnitPayload
): Promise<IProductUnit> => {
  const res = await axiosInstance.patch(`/product_units/${id}`, payload);
  return res.data;
};

/* ================= DELETE ================= */
const deleteProductUnitService = async (
  id: string
): Promise<{ success: boolean; message: string; id: string }> => {
  const res = await axiosInstance.delete(`/product_units/${id}`);
  return res.data;
};

export const productUnitService = {
  getAllProductUnits,
  createProductUnitService,
  getSingleProductUnitService,
  updateProductUnitService,
  deleteProductUnitService,
};