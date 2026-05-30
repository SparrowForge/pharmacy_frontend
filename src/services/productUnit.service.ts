import axiosInstance from "./axios";

import {
  IProductUnitResponse,
  IProductUnit,
  IGetProductUnitsQuery,
} from "@/src/types/productUnit.types";

/* GET ALL */
const getUnits = async (
  params: IGetProductUnitsQuery,
): Promise<IProductUnitResponse> => {
  const res = await axiosInstance.get("/product_units", {
    params,
  });

  return res.data;
};

/* CREATE */
const createUnit = async (payload: any): Promise<IProductUnit> => {
  const res = await axiosInstance.post("/product_units", payload);
  return res.data;
};

/* SINGLE */
const getUnit = async (id: string): Promise<IProductUnit> => {
  const res = await axiosInstance.get(`/product_units/${id}`);
  return res.data;
};

/* UPDATE */
const updateUnit = async (id: string, payload: any): Promise<IProductUnit> => {
  const res = await axiosInstance.patch(`/product_units/${id}`, payload);

  return res.data;
};

/* DELETE */
const deleteUnit = async (id: string) => {
  const res = await axiosInstance.delete(`/product_units/${id}`);
  return res.data;
};

export const productUnitService = {
  getUnits,
  createUnit,
  getUnit,
  updateUnit,
  deleteUnit,
};
