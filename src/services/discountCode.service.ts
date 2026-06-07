// services/discountCode.service.ts

import axiosInstance from "./axios";

import {
  IDiscountCode,
  IDiscountCodeResponse,
  ICreateDiscountCodePayload,
  IUpdateDiscountCodePayload,
  IDeleteDiscountCodeResponse,
  IGetDiscountCodesQuery,
} from "@/src/types/discountCode.types";

/* ================= GET ALL ================= */

const getAllDiscountCodes = async (
  params: IGetDiscountCodesQuery,
): Promise<IDiscountCodeResponse> => {
  const res = await axiosInstance.get<IDiscountCodeResponse>(
    "/discount_codes",
    {
      params,
    },
  );

  return res.data;
};

/* ================= CREATE ================= */

const createDiscountCodeService = async (
  payload: ICreateDiscountCodePayload,
): Promise<IDiscountCode> => {
  const res = await axiosInstance.post<IDiscountCode>(
    "/discount_codes",
    payload,
  );

  return res.data;
};

/* ================= GET SINGLE ================= */

const getSingleDiscountCodeService = async (
  id: string,
): Promise<IDiscountCode> => {
  const res = await axiosInstance.get<IDiscountCode>(
    `/discount_codes/${id}`,
  );

  return res.data;
};

/* ================= UPDATE ================= */

const updateDiscountCodeService = async (
  id: string,
  payload: IUpdateDiscountCodePayload,
): Promise<IDiscountCode> => {
  const res = await axiosInstance.patch<IDiscountCode>(
    `/discount_codes/${id}`,
    payload,
  );

  return res.data;
};

/* ================= DELETE ================= */

const deleteDiscountCodeService = async (
  id: string,
): Promise<IDeleteDiscountCodeResponse> => {
  const res = await axiosInstance.delete<IDeleteDiscountCodeResponse>(
    `/discount_codes/${id}`,
  );

  return res.data;
};

/* ================= EXPORT ================= */

export const discountCodeService = {
  getAllDiscountCodes,
  createDiscountCodeService,
  getSingleDiscountCodeService,
  updateDiscountCodeService,
  deleteDiscountCodeService,
};