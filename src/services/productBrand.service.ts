import axiosInstance from "./axios";

import {
  ICreateProductBrandPayload,
  IDeleteProductBrandResponse,
  IGetProductBrandsQuery,
  IProductBrand,
  IProductBrandResponse,
  IUpdateProductBrandPayload,
} from "@/src/types/productBrand.types";

/* ================= GET ALL ================= */
const getAllProductBrands = async (
  params: IGetProductBrandsQuery,
): Promise<IProductBrandResponse> => {
  const res = await axiosInstance.get<IProductBrandResponse>(
    "/product_brands",
    { params },
  );

  return res.data;
};

/* ================= CREATE ================= */
const createProductBrand = async (
  payload: ICreateProductBrandPayload,
): Promise<IProductBrand> => {
  const res = await axiosInstance.post("/product_brands", payload);
  return res.data;
};

/* ================= SINGLE ================= */
const getSingleProductBrand = async (
  id: string,
): Promise<IProductBrand> => {
  const res = await axiosInstance.get(`/product_brands/${id}`);
  return res.data;
};

/* ================= UPDATE ================= */
const updateProductBrand = async (
  id: string,
  payload: IUpdateProductBrandPayload,
): Promise<IProductBrand> => {
  const res = await axiosInstance.patch(
    `/product_brands/${id}`,
    payload,
  );

  return res.data;
};

/* ================= DELETE ================= */
const deleteProductBrand = async (
  id: string,
): Promise<IDeleteProductBrandResponse> => {
  const res = await axiosInstance.delete(`/product_brands/${id}`);
  return res.data;
};

/* ================= EXPORT ================= */
export const productBrandService = {
  getAllProductBrands,
  createProductBrand,
  getSingleProductBrand,
  updateProductBrand,
  deleteProductBrand,
};