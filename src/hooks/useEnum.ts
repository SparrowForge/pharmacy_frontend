"use client";

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  getCompanyTypeFailure,
  getCompanyTypeStart,
  getCompanyTypeSuccess,
  getShopPlansFailure,
  getShopPlansStart,
  getShopPlansSuccess,
} from "../redux/features/enum/enumSlice";
import { enumServices } from "../services/enum.service";

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

  return {
    loading: enumb.loading,
    error: enumb.error,

    shopPlans: enumb.shopPlans,
    getShopPlans,

    companyTypes: enumb.companyTypes,
    getCompanyTypes,
  };
};
