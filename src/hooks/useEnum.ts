"use client";

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  fetchPaymentMethodTypeFailure,
  fetchPaymentMethodTypeStart,
  fetchPaymentMethodTypeSuccess,
  fetchPaymentStatusesFailure,
  fetchPaymentStatusesStart,
  fetchPaymentStatusesSuccess,
  fetchProductUnitTypesFailure,
  fetchProductUnitTypesStart,
  fetchProductUnitTypesSuccess,
  fetchPurchaseOrderStatusesFailure,
  fetchPurchaseOrderStatusesStart,
  fetchPurchaseOrderStatusesSuccess,
  fetchReturnPurchaseStatusesFailure,
  fetchReturnPurchaseStatusesStart,
  fetchReturnPurchaseStatusesSuccess,
  fetchSalesSattusFailure,
  fetchSalesStatusStart,
  fetchSalesStatusSuccess,
  fetchSaleTypesFailure,
  fetchSaleTypesStart,
  fetchSaleTypesSuccess,
  getCompanyTypeFailure,
  getCompanyTypeStart,
  getCompanyTypeSuccess,
  getShopPlansFailure,
  getShopPlansStart,
  getShopPlansSuccess,
} from "../redux/features/enum/enumSlice";
import { enumServices } from "../services/enum.service";
import { fetchBatchesSuccess } from "../redux/features/product-batch/productBatchSlice";

export const useEnum = () => {
  const dispatch = useAppDispatch();
  const enumb = useAppSelector((state) => state.enums);
  const getShopPlans = useCallback(async () => {
    try {
      dispatch(getShopPlansStart());
      const response = await enumServices.getShopPlansService();
      dispatch(getShopPlansSuccess(response.values));
      return response.values;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to load shop plans";
      dispatch(getShopPlansFailure(message));
      toast.error(message);
      throw error;
    }
  }, [dispatch]);

  const getCompanyTypes = useCallback(async () => {
    try {
      dispatch(getCompanyTypeStart());
      const response = await enumServices.getCompanyTypeService();
      dispatch(getCompanyTypeSuccess(response.values));
      return response.values;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to load company types";
      dispatch(getCompanyTypeFailure(message));
      toast.error(message);
      throw error;
    }
  }, [dispatch]);

  /* ================= FETCH ================= */
  const fetchProductUnitTypes = useCallback(async () => {
    try {
      dispatch(fetchProductUnitTypesStart());

      const res = await enumServices.getProductUnitTypes();

      dispatch(fetchProductUnitTypesSuccess(res.values));

      return res.values;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch product unit types";

      dispatch(fetchProductUnitTypesFailure(message));

      toast.error(message);

      throw error;
    }
  }, [dispatch]);

  /* ================= FETCH ================= */
  const fetchSalesStatus = useCallback(async () => {
    try {
      dispatch(fetchSalesStatusStart());

      const res = await enumServices.getSalesStatus();
      console.log(res);

      dispatch(fetchSalesStatusSuccess(res.values));

      return res.values;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch sales status types";

      dispatch(fetchSalesSattusFailure(message));

      toast.error(message);

      throw error;
    }
  }, [dispatch]);

  /* ================= FETCH ================= */
  const fetchPaymentMethodTypes = useCallback(async () => {
    try {
      dispatch(fetchPaymentMethodTypeStart());

      const res = await enumServices.getPaymentMethodTypes();
      console.log(res);

      dispatch(fetchPaymentMethodTypeSuccess(res.values));

      return res.values;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch sales status types";

      dispatch(fetchPaymentMethodTypeFailure(message));

      toast.error(message);

      throw error;
    }
  }, [dispatch]);

  /* ================= FETCH ================= */
  const fetchPurchaseOrderStatuses = useCallback(async () => {
    try {
      dispatch(fetchPurchaseOrderStatusesStart());

      const res = await enumServices.getPurchaseOrderStatuses();
      console.log(res);

      dispatch(fetchPurchaseOrderStatusesSuccess(res.values));

      return res.values;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to fetch purchase order statuses";

      dispatch(fetchPurchaseOrderStatusesFailure(message));

      toast.error(message);

      throw error;
    }
  }, [dispatch]);

  /* ================= FETCH ================= */
  const fetchPaymentStatuses = useCallback(async () => {
    try {
      dispatch(fetchPaymentStatusesStart());

      const res = await enumServices.getPaymentStatuses();
      console.log(res);

      dispatch(fetchPaymentStatusesSuccess(res.values));

      return res.values;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch payment statuses";

      dispatch(fetchPaymentStatusesFailure(message));

      toast.error(message);

      throw error;
    }
  }, [dispatch]);

  /* ================= FETCH ================= */
  const fetchReturnPurchaseStatuses = useCallback(async () => {
    try {
      dispatch(fetchReturnPurchaseStatusesStart());

      const res = await enumServices.getReturnPurchaseStatuses();
      console.log(res);

      dispatch(fetchReturnPurchaseStatusesSuccess(res.values));

      return res.values;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to fetch return purchase statuses";

      dispatch(fetchReturnPurchaseStatusesFailure(message));

      toast.error(message);

      throw error;
    }
  }, [dispatch]);

  const fetchSaleTypes = useCallback(async () => {
    try {
      dispatch(fetchSaleTypesStart());

      const res = await enumServices.getSaleTypes();
      console.log(res);

      dispatch(fetchSaleTypesSuccess(res.values));

      return res.values;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch sale types";

      dispatch(fetchSaleTypesFailure(message));

      toast.error(message);

      throw error;
    }
  }, [dispatch]);

  return {
    loading: enumb.loading,
    error: enumb.error,

    shopPlans: enumb.shopPlans,
    getShopPlans,

    companyTypes: enumb.companyTypes,
    getCompanyTypes,

    unitTypes: enumb.unitTypes,
    fetchProductUnitTypes,

    salesStatus: enumb.salesStatus,
    fetchSalesStatus,

    paymentMethodTypes: enumb.paymentMethodTypes,
    fetchPaymentMethodTypes,

    purchaseOrderStatuses: enumb.purchaseOrderStatuses,
    fetchPurchaseOrderStatuses,

    paymentStatuses: enumb.paymentStatuses,
    fetchPaymentStatuses,

    returnPurchaseStatuses: enumb.returnPurchaseStatuses,
    fetchReturnPurchaseStatuses,

    saleTypes: enumb.saleTypes,
    fetchSaleTypes,
  };
};
