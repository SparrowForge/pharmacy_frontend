import { ICompanyTypeEnumResponse, IProductUnitTypeResponse, IShopPlanEnumResponse } from "../types/enum.types";
import axiosInstance from "./axios";

const getShopPlansService = async (): Promise<IShopPlanEnumResponse> => {

  const response = await axiosInstance.get("/datatypes/_shop_plan");
  return response.data;
};

const getCompanyTypeService = async (): Promise<ICompanyTypeEnumResponse> => {
  const response = await axiosInstance.get("/datatypes/_company_type");
  return response.data;
};

/* ================= GET PRODUCT UNIT TYPES ================= */
const getProductUnitTypes = async (): Promise<IProductUnitTypeResponse> => {
  const res = await axiosInstance.get<IProductUnitTypeResponse>(
    "/datatypes/product_unit_type"
  );

  return res.data;
};


export const enumServices = {
  getShopPlansService,
  getCompanyTypeService,
  getProductUnitTypes
};
