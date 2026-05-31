import axiosInstance from "./axios";

import {
  ICreateProductOfferPayload,
  IDeleteProductOfferResponse,
  IGetProductOffersQuery,
  IProductOffer,
  IProductOfferResponse,
  IUpdateProductOfferPayload,
} from "@/src/types/productOffers.types";

/* ================= GET ALL ================= */
const getAllProductOffers = async (
  params: IGetProductOffersQuery,
): Promise<IProductOfferResponse> => {
  const res = await axiosInstance.get<IProductOfferResponse>(
    "/product_offers",
    { params },
  );

  return res.data;
};

/* ================= CREATE ================= */
const createProductOfferService = async (
  payload: ICreateProductOfferPayload,
): Promise<IProductOffer> => {
  const res = await axiosInstance.post<IProductOffer>(
    "/product_offers",
    payload,
  );

  return res.data;
};

/* ================= SINGLE ================= */
const getSingleProductOfferService = async (
  id: string,
): Promise<IProductOffer> => {
  const res = await axiosInstance.get<IProductOffer>(`/product_offers/${id}`);

  return res.data;
};

/* ================= UPDATE ================= */
const updateProductOfferService = async (
  id: string,
  payload: IUpdateProductOfferPayload,
): Promise<IProductOffer> => {
  const res = await axiosInstance.patch<IProductOffer>(
    `/product_offers/${id}`,
    payload,
  );

  return res.data;
};

/* ================= DELETE ================= */
const deleteProductOfferService = async (
  id: string,
): Promise<IDeleteProductOfferResponse> => {
  const res = await axiosInstance.delete<IDeleteProductOfferResponse>(
    `/product_offers/${id}`,
  );

  return res.data;
};

export const productOfferService = {
  getAllProductOffers,
  createProductOfferService,
  getSingleProductOfferService,
  updateProductOfferService,
  deleteProductOfferService,
};
