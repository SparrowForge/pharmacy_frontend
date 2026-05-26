import { ICompanyTypeEnumResponse, IShopPlanEnumResponse } from "../types/enum.types";
import axiosInstance from "./axios";

const getShopPlansService = async (): Promise<IShopPlanEnumResponse> => {

  const response = await axiosInstance.get("/datatypes/_shop_plan");
  return response.data;
};

const getCompanyTypeService = async (): Promise<ICompanyTypeEnumResponse> => {
  const response = await axiosInstance.get("/datatypes/_company_type");
  return response.data;
};

export const enumServices = {
  getShopPlansService,
  getCompanyTypeService
};
