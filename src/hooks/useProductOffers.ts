import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { toast } from "sonner";

import { productOfferService } from "../services/productOffer.service";

import {
  fetchOffersStart,
  fetchOffersSuccess,
  fetchOffersFailure,
  createOfferStart,
  createOfferSuccess,
  createOfferFailure,
  fetchSingleOfferStart,
  fetchSingleOfferSuccess,
  fetchSingleOfferFailure,
  updateOfferStart,
  updateOfferSuccess,
  updateOfferFailure,
  deleteOfferStart,
  deleteOfferSuccess,
  deleteOfferFailure,
} from "../redux/features/product-offer/productOfferSlice";

import {
  ICreateProductOfferPayload,
  IUpdateProductOfferPayload,
} from "../types/productOffers.types";

export const useProductOffers = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.productOffers);

  /* ================= FETCH LIST ================= */
  const fetchProductOffers = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchOffersStart());

        const res = await productOfferService.getAllProductOffers({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchOffersSuccess(res));
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch product offers";

        dispatch(fetchOffersFailure(message));
        toast.error(message);
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */
  const createProductOffer = useCallback(
    async (payload: ICreateProductOfferPayload) => {
      try {
        dispatch(createOfferStart());

        const res =
          await productOfferService.createProductOfferService(payload);

        dispatch(createOfferSuccess(res));

        toast.success("Product offer created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create product offer";

        dispatch(createOfferFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= SINGLE ================= */
  const fetchSingleProductOffer = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleOfferStart());

        const res = await productOfferService.getSingleProductOfferService(id);

        dispatch(fetchSingleOfferSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch product offer";

        dispatch(fetchSingleOfferFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */
  const updateProductOffer = useCallback(
    async (id: string, payload: IUpdateProductOfferPayload) => {
      try {
        dispatch(updateOfferStart());

        const res = await productOfferService.updateProductOfferService(
          id,
          payload,
        );

        dispatch(updateOfferSuccess(res));

        toast.success("Product offer updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update product offer";

        dispatch(updateOfferFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */
  const deleteProductOffer = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteOfferStart());

        const res = await productOfferService.deleteProductOfferService(id);

        dispatch(deleteOfferSuccess(id));

        toast.success(res?.message || "Product offer deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete product offer";

        dispatch(deleteOfferFailure(message));
        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchProductOffers,
    createProductOffer,
    fetchSingleProductOffer,
    updateProductOffer,
    deleteProductOffer,

    ...state,
  };
};
