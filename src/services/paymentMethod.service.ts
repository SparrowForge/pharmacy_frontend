// services/paymentMethod.service.ts

import axiosInstance from "./axios";

import {
  IPaymentMethod,
  IPaymentMethodResponse,
  ICreatePaymentMethodPayload,
  IUpdatePaymentMethodPayload,
  IDeletePaymentMethodResponse,
  IGetPaymentMethodsQuery,
} from "@/src/types/paymentMethod.types";

/* ================= GET ALL ================= */

const getAllPaymentMethods = async (
  params: IGetPaymentMethodsQuery,
): Promise<IPaymentMethodResponse> => {
  const res = await axiosInstance.get<IPaymentMethodResponse>(
    "/payment_methods",
    {
      params,
    },
  );

  return res.data;
};

/* ================= CREATE ================= */

const createPaymentMethodService = async (
  payload: ICreatePaymentMethodPayload,
): Promise<IPaymentMethod> => {
  const res = await axiosInstance.post<IPaymentMethod>(
    "/payment_methods",
    payload,
  );

  return res.data;
};

/* ================= GET SINGLE ================= */

const getSinglePaymentMethodService = async (
  id: string,
): Promise<IPaymentMethod> => {
  const res = await axiosInstance.get<IPaymentMethod>(`/payment_methods/${id}`);

  return res.data;
};

/* ================= UPDATE ================= */

const updatePaymentMethodService = async (
  id: string,
  payload: IUpdatePaymentMethodPayload,
): Promise<IPaymentMethod> => {
  const res = await axiosInstance.patch<IPaymentMethod>(
    `/payment_methods/${id}`,
    payload,
  );

  return res.data;
};

/* ================= DELETE ================= */

const deletePaymentMethodService = async (
  id: string,
): Promise<IDeletePaymentMethodResponse> => {
  const res = await axiosInstance.delete<IDeletePaymentMethodResponse>(
    `/payment_methods/${id}`,
  );

  return res.data;
};

/* ================= EXPORT ================= */

export const paymentMethodService = {
  getAllPaymentMethods,
  createPaymentMethodService,
  getSinglePaymentMethodService,
  updatePaymentMethodService,
  deletePaymentMethodService,
};
